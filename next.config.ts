import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true, // Retain this if you want typed routes
  },
  pageExtensions: ["tsx", "ts"], // Matches your file extensions
};

export default nextConfig;
