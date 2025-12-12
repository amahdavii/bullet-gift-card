import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["d13080yemosbe2.cloudfront.net"],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://bulletgift.com/api",
    NEXT_PUBLIC_DASHBOARD_API_URL:
      process.env.NEXT_PUBLIC_DASHBOARD_API_URL ||
      "https://bulletgift.com/api",
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || "https://bulletgift.com",
  },
};

export default nextConfig;
