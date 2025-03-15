import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any hostname
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
