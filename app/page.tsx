import { fetchTiles } from "@/lib/instagram";
import { TileGrid } from "@/components/tile-grid";
import { LogoMark } from "@/components/logo-mark";

// 1 時間ごとに Instagram 側の最新を取り込み直す。
export const revalidate = 3600;

export default async function Home() {
  // Graph API の limit。カルーセル展開後の実タイル数はこれの 1.5〜2 倍になり得る。
  const tiles = await fetchTiles(60);
  return (
    <>
      <LogoMark />
      <TileGrid tiles={tiles} />
    </>
  );
}
