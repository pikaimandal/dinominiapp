import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable only known experimental options if needed
    typedRoutes: true, // Example: Enable typed routes (optional)
  },
  // If using the App Directory, no need for `pageExtensions`
  pageExtensions: ["tsx", "ts"],
};

export default nextConfig;
