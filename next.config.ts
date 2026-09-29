import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 is Next's default; photos use 90 so beadwork and fabric texture survive re-encoding.
    qualities: [75, 90],
  },
};

export default nextConfig;
