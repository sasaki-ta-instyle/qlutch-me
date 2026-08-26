import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BudouxGlobal } from "@/components/budoux-global";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://qlutch.me"),
  title: {
    default: "QLUTCH【クラッチ】",
    template: "%s | QLUTCH",
  },
  description:
    "QLUTCH【クラッチ】は、ブランドに必要な問いを整理し、方向性を示すクリエイティブプロダクションです。",
  openGraph: {
    title: "QLUTCH【クラッチ】",
    description:
      "QLUTCH【クラッチ】は、ブランドに必要な問いを整理し、方向性を示すクリエイティブプロダクションです。",
    url: "https://qlutch.me",
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
        <BudouxGlobal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
