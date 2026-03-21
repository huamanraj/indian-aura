import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
