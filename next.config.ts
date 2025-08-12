import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["d13080yemosbe2.cloudfront.net"],
  },
  env: {
    NEXT_PUBLIC_API_URL: "http://13.60.167.192/api",
  },
};

export default nextConfig;
