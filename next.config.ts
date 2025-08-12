import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["d13080yemosbe2.cloudfront.net"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
