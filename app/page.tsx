import { fetchTiles } from "@/lib/instagram";
import { TileGrid } from "@/components/tile-grid";

// 1 時間ごとに Instagram 側の最新を取り込み直す。
export const revalidate = 3600;

export default async function Home() {
  const tiles = await fetchTiles(100);
  return <TileGrid tiles={tiles} />;
}
