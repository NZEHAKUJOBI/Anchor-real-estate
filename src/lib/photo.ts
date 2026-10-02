import type { PhotoType } from "./constants";

/**
 * Identifies an uploaded image from its leading bytes. The browser's declared
 * MIME type is the uploader's claim, so it is never trusted on its own — the
 * stored type, and the Content-Type the photo is later served with, come
 * from here.
 */
export function sniffImageType(bytes: Uint8Array): PhotoType | null {
  const startsWith = (signature: number[], offset = 0) =>
    bytes.length >= offset + signature.length &&
    signature.every((byte, index) => bytes[offset + index] === byte);

  if (startsWith([0xff, 0xd8, 0xff])) return "image/jpeg";
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  // "RIFF" then a length, then "WEBP".
  if (startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8)) {
    return "image/webp";
  }

  return null;
}
