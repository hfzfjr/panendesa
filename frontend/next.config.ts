import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker builds (smaller image size)
  output: 'standalone',
};

export default nextConfig;
