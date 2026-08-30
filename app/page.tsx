import { ViewTransition } from "react";
import { fetchTiles } from "@/lib/instagram";
import { TileGrid } from "@/components/tile-grid";
import { LogoMark } from "@/components/logo-mark";

// 1 時間ごとに Instagram 側の最新を取り込み直す。
export const revalidate = 3600;

export default async function Home() {
  // Graph API の limit。カルーセル展開後の実タイル数はこれの 1.5〜2 倍になり得る。
  const tiles = await fetchTiles(60);
  return (
    /*
     * 【C】ページ本体を <ViewTransition> でラップ。default="auto" で
     * ページ遷移時に root スナップショット cross-fade が走る。
     * Header / Footer は個別 viewTransitionName で切り離し済み。
     */
    <ViewTransition default="auto">
      <LogoMark />
      <TileGrid tiles={tiles} />
    </ViewTransition>
  );
}
