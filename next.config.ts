import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.BASE_PATH || "/app",
  assetPrefix: process.env.ASSET_PREFIX || "/app",
  output: "standalone",
};

export default nextConfig;
