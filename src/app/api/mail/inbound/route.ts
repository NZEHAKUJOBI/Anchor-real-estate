import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { MailMessage } from "@/lib/models/MailMessage";
import { Member } from "@/lib/models/Member";
import { Enquiry } from "@/lib/models/Enquiry";
import { cleanEmailAddress, resendApiKey } from "@/lib/mail";

/**
 * Inbound Email Webhook
 *
 * Accepts incoming email events from providers such as Resend Inbound,
 * SendGrid, Postmark, or generic webhooks.
 *
 * If INBOUND_MAIL_SECRET is set, requests must include either:
 * - "x-inbound-secret: <secret>" header
 * - "Authorization: Bearer <secret>" header
 */
export async function POST(request: NextRequest) {
  const secret = process.env.INBOUND_MAIL_SECRET?.trim();
  if (secret) {
    const authHeader = request.headers.get("authorization");
    const secretHeader = request.headers.get("x-inbound-secret");
    const bearer = authHeader?.replace(/^Bearer\s+/i, "").trim();

    if (secretHeader !== secret && bearer !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let from = "";
  let to: string[] = [];
  let subject = "";
  let bodyText = "";
  let bodyHtml: string | undefined;
  let replyTo: string | undefined;

  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const json = await request.json();
      // Handle Resend webhook event structure or flat JSON
      const data = json.data ?? json;

      from = String(data.from || "");
      if (Array.isArray(data.to)) {
        to = data.to.map((item: unknown) => String(item));
      } else if (data.to) {
        to = [String(data.to)];
      }

      subject = String(data.subject || "(No Subject)");
      bodyText = String(data.text || data.bodyText || data.body || "");
      bodyHtml = data.html || data.bodyHtml;
      replyTo = data.reply_to || data.replyTo;

      // Resend email.received webhook passes email_id; fetch full text/html if needed
      const emailId = data.email_id || data.id;
      if (emailId && (!bodyText || !bodyHtml)) {
        const apiKey = resendApiKey();
        if (apiKey) {
          try {
            let res = await fetch(
              `https://api.resend.com/emails/receiving/${emailId}`,
              { headers: { Authorization: `Bearer ${apiKey}` } },
            );
            if (!res.ok) {
              res = await fetch(`https://api.resend.com/emails/${emailId}`, {
                headers: { Authorization: `Bearer ${apiKey}` },
              });
            }
            if (res.ok) {
              const full = await res.json();
              if (full.text) bodyText = full.text;
              if (full.html) bodyHtml = full.html;
              if (!from && full.from) from = full.from;
              if (!subject && full.subject) subject = full.subject;
            }
          } catch (apiErr) {
            console.warn(
              "[inbound-mail] could not fetch body via Resend API:",
              apiErr,
            );
          }
        }
      }
    } else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await request.formData();
      from = String(formData.get("from") || formData.get("sender") || "");
      const rawTo = formData.get("to") || formData.get("recipient") || "";
      to = [String(rawTo)];
      subject = String(formData.get("subject") || "(No Subject)");
      bodyText = String(formData.get("text") || formData.get("body") || "");
      bodyHtml = (formData.get("html") as string) || undefined;
      replyTo = (formData.get("replyTo") as string) || undefined;
    } else {
      return NextResponse.json(
        { error: "Unsupported Content-Type" },
        { status: 400 },
      );
    }

    if (!from) {
      return NextResponse.json(
        { error: "Missing sender (from) address" },
        { status: 422 },
      );
    }

    await connectDb();

    const fromClean = cleanEmailAddress(from) || from.toLowerCase().trim();
    const toCleanList = to
      .map((addr) => cleanEmailAddress(addr) || addr.toLowerCase().trim())
      .filter(Boolean);

    // Attempt to automatically correlate with existing Member or Enquiry
    const [matchingMember, matchingEnquiry] = await Promise.all([
      Member.findOne({ email: fromClean }).select("_id").lean(),
      Enquiry.findOne({ email: fromClean })
        .sort({ createdAt: -1 })
        .select("_id")
        .lean(),
    ]);

    const doc = await MailMessage.create({
      direction: "inbound",
      from,
      fromEmail: fromClean,
      to: to.length ? to : ["secretariat@anchorrealestategroup.ng"],
      toEmail: toCleanList.length
        ? toCleanList
        : ["secretariat@anchorrealestategroup.ng"],
      replyTo,
      subject,
      bodyText: bodyText || (bodyHtml ? "HTML Email (view formatted content)" : "(Empty Message)"),
      bodyHtml,
      status: "received",
      isRead: false,
      member: matchingMember?._id,
      enquiry: matchingEnquiry?._id,
    });

    console.log(`[inbound-mail] stored email from ${fromClean} (id: ${doc._id})`);

    return NextResponse.json({
      ok: true,
      id: String(doc._id),
      linkedMember: matchingMember ? String(matchingMember._id) : null,
      linkedEnquiry: matchingEnquiry ? String(matchingEnquiry._id) : null,
    });
  } catch (err) {
    console.error("[inbound-mail] processing error:", err);
    return NextResponse.json(
      { error: "Failed to process inbound email" },
      { status: 500 },
    );
  }
}
