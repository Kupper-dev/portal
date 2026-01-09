

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/app",
  assetPrefix: "/app",
  output: "standalone",
};

export default nextConfig;
