import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© QLUTCH / KÏN LLC</span>
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
