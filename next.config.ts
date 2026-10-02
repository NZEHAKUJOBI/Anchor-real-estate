import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // The registration form carries a passport photograph. The browser
      // downscales it first, but the action accepts up to 2 MB
      // (PHOTO_MAX_BYTES) for any that skip that step, plus the text fields
      // and multipart overhead.
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
