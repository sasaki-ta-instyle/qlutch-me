import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.qlutch.me"),
  title: {
    default: "QLUTCH — Creative Production",
    template: "%s | QLUTCH",
  },
  description:
    "QLUTCH【クラッチ】は、ブランドに必要な問いを整理し、方向性を示すクリエイティブプロダクションです。",
  openGraph: {
    title: "QLUTCH — Creative Production",
    description:
      "QLUTCH【クラッチ】は、ブランドに必要な問いを整理し、方向性を示すクリエイティブプロダクションです。",
    url: "https://www.qlutch.me",
    siteName: "QLUTCH",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
