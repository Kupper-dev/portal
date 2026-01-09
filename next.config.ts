

import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  basePath: "/app",
  assetPrefix: "/app",
  output: "standalone",
};

export default nextConfig;
