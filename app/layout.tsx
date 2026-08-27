import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BudouxGlobal } from "@/components/budoux-global";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "QLUTCH【クラッチ】は、ブランドに必要な問いを整理し、方向性を示すクリエイティブプロダクションです。ヴィジュアルディレクション、グラフィック デザインを統合し、構想から制作まで一貫して担います。言語化を起点に、意思決定の精度を高め、表現へと導きます。";

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
    <html lang="ja" className={raleway.variable}>
      <body>
        <BudouxGlobal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
