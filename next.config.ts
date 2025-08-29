import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["d13080yemosbe2.cloudfront.net"],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://13.60.167.192/api",
    NEXT_PUBLIC_DASHBOARD_API_URL:
      process.env.NEXT_PUBLIC_DASHBOARD_API_URL ||
      "http://13.60.167.192:82/api",
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || "http://13.60.167.192",
  },
};

export default nextConfig;
