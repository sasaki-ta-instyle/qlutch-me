import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BudouxGlobal } from "@/components/budoux-global";
import "./globals.css";

const SITE_DESCRIPTION =
  "戎田夏菜と佐々木 猛によるクリエイティブデュオ。広告ヴィジュアル、ロゴ、パッケージ、ウェブサイトなど多岐にわたりアートディレクション及びデザインを手がけています。";

export const metadata: Metadata = {
  metadataBase: new URL("https://qlutch.me"),
  title: {
    default: "QLUTCH【クラッチ】- Creative Production, Visual Direction",
    template: "%s ｜ QLUTCH【クラッチ】- Creative Production, Visual Direction",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "QLUTCH【クラッチ】- Creative Production, Visual Direction",
    description: SITE_DESCRIPTION,
    url: "https://qlutch.me",
    siteName: "QLUTCH",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "QLUTCH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QLUTCH【クラッチ】- Creative Production, Visual Direction",
    description: SITE_DESCRIPTION,
    images: ["/ogp.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja">
      <body>
        <BudouxGlobal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
