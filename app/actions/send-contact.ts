"use server";

/**
 * Contact フォームのサーバアクション。
 * Resend 経由でメール送信。RESEND_API_KEY が未設定なら送信をスキップして
 * 骨子段階でも動作させる（コンソール出力のみ）。
 */

export type ContactState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string };

const isEmail = (v: string) => /.+@.+\..+/.test(v);

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // honeypot（スパム対策 1 段のみ）
  const trap = String(formData.get("company") ?? "");
  if (trap) return { status: "ok" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "未入力の項目があります。" };
  }
  if (!isEmail(email)) {
    return { status: "error", message: "メールアドレスの形式が不正です。" };
  }
  if (message.length > 5000) {
    return { status: "error", message: "本文が長すぎます（5000 文字以内）。" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "contact@qlutch.me";

  if (!apiKey || !to) {
    console.warn("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL missing; skipping send", {
      name,
      email,
      messagePreview: message.slice(0, 80),
    });
    return { status: "ok" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[qlutch.me/contact] ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[contact] resend non-2xx", res.status, text);
      return { status: "error", message: "送信に失敗しました。" };
    }
    return { status: "ok" };
  } catch (error) {
    console.error("[contact] resend threw", error);
    return { status: "error", message: "送信に失敗しました。" };
  }
}
