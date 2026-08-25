"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/send-contact";
import styles from "./page.module.css";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.status === "ok") {
    return (
      <p className={styles.thanks}>
        送信ありがとうございました。追ってご連絡いたします。
      </p>
    );
  }

  return (
    <form className={styles.form} action={action} noValidate>
      <label className={styles.field}>
        <span className={styles.label}>お名前</span>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>メールアドレス</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>ご相談内容</span>
        <textarea
          name="message"
          required
          rows={7}
          className={styles.textarea}
        />
      </label>

      {/* honeypot */}
      <label className={styles.honeypot} aria-hidden>
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      {state.status === "error" && (
        <p className={styles.error}>{state.message}</p>
      )}

      <button
        type="submit"
        className={styles.submit}
        disabled={pending}
        aria-disabled={pending}
      >
        {pending ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
