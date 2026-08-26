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
  async redirects() {
    return [
      // www → apex 301 リダイレクト (URL を qlutch.me に正規化)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.qlutch.me" }],
        destination: "https://qlutch.me/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
