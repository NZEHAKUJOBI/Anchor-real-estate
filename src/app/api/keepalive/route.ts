import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";

/**
 * Keep-alive ping for the MongoDB Atlas Free (M0) cluster.
 *
 * Atlas pauses a Free cluster after 30 days with zero connections. A Vercel
 * cron job (see vercel.json) calls this route once a day so the cluster always
 * sees recent activity. It only runs a `ping` command; nothing is read or
 * written.
 *
 * If CRON_SECRET is set, Vercel sends "Authorization: Bearer <CRON_SECRET>"
 * with every cron request, and any other caller gets a 401.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  try {
    const mongoose = await connectDb();
    const db = mongoose.connection.db;
    if (!db) throw new Error("No database handle after connecting");
    await db.admin().ping();

    return NextResponse.json({
      ok: true,
      ms: Date.now() - started,
      at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[keepalive] MongoDB ping failed:", err);
    return NextResponse.json(
      { ok: false, error: "Database ping failed" },
      { status: 503 },
    );
  }
}
