/**
 * 一時的な診断エンドポイント。IG_LONG_LIVED_TOKEN と IG_USER_ID を使って
 * graph.instagram.com と graph.facebook.com の両方を試し、エラー内容を返す。
 * トークンの値は返却しない（安全）。診断が済んだら削除する。
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function probe(base: string, userId: string, token: string) {
  const url = new URL(`${base}/v21.0/${userId}/media`);
  url.searchParams.set(
    "fields",
    "id,media_type,media_url,permalink,timestamp,children{id,media_type,media_url}"
  );
  url.searchParams.set("access_token", token);
  url.searchParams.set("limit", "5");

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    const text = await res.text();
    let json: unknown = null;
    try {
      json = JSON.parse(text);
    } catch {}
    return {
      base,
      ok: res.ok,
      status: res.status,
      // 生 body の先頭 800 文字だけ返す（token は URL に付くので body だけ）
      body: json ?? text.slice(0, 800),
    };
  } catch (e) {
    return {
      base,
      ok: false,
      status: 0,
      body: `fetch threw: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
}

export async function GET() {
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_LONG_LIVED_TOKEN;

  return NextResponse.json({
    env: {
      hasUserId: !!userId,
      hasToken: !!token,
      userIdLength: userId?.length ?? 0,
      tokenLength: token?.length ?? 0,
    },
    probes: !userId || !token
      ? []
      : await Promise.all([
          probe("https://graph.instagram.com", userId, token),
          probe("https://graph.facebook.com", userId, token),
        ]),
  });
}
