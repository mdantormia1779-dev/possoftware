import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: false,
    cpus: 1,
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
