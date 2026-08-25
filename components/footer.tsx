import styles from "./footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <span>© {year} QLUTCH</span>
      <a
        href="https://www.instagram.com/qlutchme/"
        target="_blank"
        rel="noreferrer noopener"
        className={styles.ig}
      >
        Instagram @qlutchme
      </a>
    </footer>
  );
}
