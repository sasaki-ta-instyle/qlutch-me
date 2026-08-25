import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Instagram CDN hosts — media_url / thumbnail_url は署名付きで
    // scontent-*.cdninstagram.com / *.fbcdn.net に飛ぶ。
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
