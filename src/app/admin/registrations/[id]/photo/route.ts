import { isValidObjectId } from "mongoose";
import { checkPermission } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";

/**
 * Serves an applicant's passport photograph to signed-in officers. The photo
 * is personal data, so it is never public: the proxy keeps signed-out traffic
 * off /admin, and the permission check here is the one that counts.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = await checkPermission("enquiries:read");
  if ("error" in guard) return new Response(guard.error, { status: 403 });

  const { id } = await params;
  if (!isValidObjectId(id)) return new Response("Not found", { status: 404 });

  await connectDb();
  const registration = await Registration.findById(id).select("+photo");
  const photo = registration?.photo;
  if (!photo) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(photo.data), {
    headers: {
      // Stored from the sniffed bytes, never from the uploader's claim.
      "Content-Type": photo.contentType,
      "Content-Length": String(photo.data.length),
      "Content-Disposition": "inline",
      // A registration's photo never changes; keep it out of shared caches.
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
