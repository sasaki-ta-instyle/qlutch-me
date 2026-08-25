import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "QLUTCH へのお問い合わせ。制作のご相談やお見積もりについて。",
};

export default function ContactPage() {
  return (
    <section className={styles.section}>
      <h1 className={styles.h1}>Contact</h1>
      <p className={styles.lede}>
        制作のご相談は下記フォームから。返信は通常 2〜3 営業日以内です。
      </p>
      <ContactForm />
      <p className={styles.direct}>
        直接メールの場合は{" "}
        <a href="mailto:i@qlutch.me" className={styles.mailLink}>
          i@qlutch.me
        </a>
      </p>
    </section>
  );
}
