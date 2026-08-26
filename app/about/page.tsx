import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ABOUT",
  description:
    "QLUTCH【クラッチ】は、ブランドに必要な問いを整理し、方向性を示すクリエイティブプロダクションです。",
};

type Row = [date: string, title: string, url?: string];

const books: Row[] = [
  ["2019.7", "PAPER STOCK MEMBERS CREATORS FILE"],
  ["2019.3", "デザイン・メイキング 167 デザイナーのラフスケッチ実例集 Vol.2", "https://amzn.to/2tMuCup"],
  ["2019.2", "MdN デザイナーズファイル 2019", "https://amzn.to/2NtJK8V"],
  ["2019.1", "デザインノート No.83", "https://amzn.to/2RKPaBO"],
  ["2018.3", "デザイン・メイキング 152 デザイナーのラフスケッチ実例集", "https://amzn.to/2tqRLoT"],
  ["2018.2", "MdN デザイナーズファイル 2018", "https://amzn.to/2CfGEm3"],
  ["2017.9", "デザインノート No.75", "https://amzn.to/2fMTXAI"],
  ["2017.3", "デザイナーのアイデア戦略 発想を生み出すデザインのスケッチ実例集", "https://amzn.to/2n5vjJV"],
  ["2017.2", "MdN デザイナーズファイル 2017", "https://amzn.to/2xOf2Sp"],
  ["2016.3", "デザイナーのラフスケッチ デザインのアイデアを形にする過程", "https://amzn.to/2xWIh5e"],
  ["2016.2", "MdN デザイナーズファイル 2016", "https://amzn.to/2fNtC5H"],
  ["2015.11", "プロとして恥ずかしくない 新・デザインの大原則", "https://amzn.to/2fMIaTl"],
  ["2015.2", "MdN デザイナーズファイル 2015", "https://amzn.to/2xNcX9o"],
];

const awards: Row[] = [["2016.6", "カンヌライオンズ 2016 PR Bronze"]];

const exhibitions: Row[] = [
  ["2026.1", "「クリエイター 100 人からの年賀状」展 vol.21 ／ 竹尾見本帖本店", "https://www.takeo.co.jp/exhibition/mihoncho/detail/20260122.html"],
  ["2025.1", "「クリエイター 100 人からの年賀状」展 vol.20 ／ 竹尾見本帖本店", "https://www.takeo.co.jp/exhibition/mihoncho/detail/20250124.html"],
  ["2024.1", "「クリエイター 100 人からの年賀状」展 vol.19 ／ 竹尾見本帖本店", "https://www.takeo.co.jp/exhibition/mihoncho/detail/20240124.html"],
  ["2023.1", "「クリエイター 100 人からの年賀状」展 vol.18 ／ 竹尾見本帖本店", "https://www.takeo.co.jp/exhibition/mihoncho/detail/20230123.html"],
  ["2022.1", "「クリエイター 100 人からの年賀状」展 vol.17 ／ 竹尾見本帖本店", "https://www.takeo.co.jp/exhibition/mihoncho/detail/20220120.html"],
  ["2021.1", "「クリエイター 100 人からの年賀状」展 vol.16 ／ 竹尾見本帖本店", "https://www.takeo.co.jp/exhibition/mihoncho/detail/20210122.html"],
  ["2020.6", "「Fine paper, Fine work 展」vol.06 ／ 竹尾青山見本帖", "https://www.takeo.co.jp/news/detail/003093.html"],
  ["2020.1", "「クリエイター 100 人からの年賀状」展 vol.15 ／ 竹尾見本帖本店", "https://www.takeo.co.jp/exhibition/mihoncho/detail/20200128.html"],
  ["2019.1", "「クリエイター 100 人からの年賀状」展 vol.14 ／ 竹尾見本帖本店", "https://www.takeo.co.jp/exhibition/mihoncho/detail/20190123.html"],
  ["2018.1", "「クリエイター 100 人からの年賀状」展 vol.13 ／ 竹尾見本帖本店", "https://www.takeo.co.jp/exhibition/mihoncho/detail/20180126.html"],
];

const clients =
  "AGF, AiiA, Aimeine, allureville, ANA, ANAYI, ANNA SUI, au, audio-technica, BCL COMPANY, Black Magazine (New Zealand), Canon, CRESTBRIDGE, CyberZ, DOROAS, Dr.Jart+, Ezaki Glico, heroine make (Global), IMA RED, Imju, I-ne, iRobot, ISEHAN, JILL STUART, KANEBO, KEITA MARUYAMA, KISSME I (China), KODA KUMI LIVE TOUR 2017 ～W FACE～, KOSE, KURABO, LADIT, Laforet, LANVIN en Bleu, LVMH (Paris), Meiji, MiMC, MN, NAIGAI, NISHIKAWA, NISSIN FOODS, NowLd, OPERA, PANTONE, PAUL & JOE, Peclers Paris, re-quest QJ, SANYO SHOKAI, SEABREEZE, SHISEIDO, Sony Music, SPUR, SUNTORY, To b. by agnès b., 東京都庭園美術館, TOYOTA, Vendome Aoyama, Vivienne Westwood, VOLVO, etc.";

export default function AboutPage() {
  return (
    <article className={styles.article}>
      <p className={styles.lede}>
        QLUTCH【クラッチ】は、ブランドに必要な問いを整理し、方向性を示すクリエイティブプロダクションです。ヴィジュアルディレクション、グラフィック デザインを統合し、構想から制作まで一貫して担います。言語化を起点に、意思決定の精度を高め、表現へと導きます。
      </p>

      <section className={styles.section}>
        <h2 className={styles.h2}>Creators</h2>

        <div className={styles.creator}>
          <p className={styles.role}>Creative Director</p>
          <p className={styles.name}>
            戎田 夏菜 <span className={styles.romaji}>EBISUDA Kana</span>
          </p>
          <Image
            src="/profile/kana.jpg"
            alt="戎田 夏菜"
            width={100}
            height={100}
            className={styles.photo}
          />
          <p className={styles.bio}>
            横浜生まれ。文化服装学院情報科卒。雑誌社編集部、国内外ブランド PR、アーティストマネージメントおよびプロダクション業を経て、渡英。帰国後、2013年にQLUTCHを設立。ヴィジュアルディレクション、スタイリングを行う。
          </p>
        </div>

        <div className={styles.creator}>
          <p className={styles.role}>Art Director + Graphic Designer</p>
          <p className={styles.name}>
            佐々木 猛 <span className={styles.romaji}>SASAKI Takeshi</span>
          </p>
          <Image
            src="/profile/takeshi.jpg"
            alt="佐々木 猛"
            width={100}
            height={100}
            className={styles.photo}
          />
          <p className={styles.bio}>
            東京生まれ。東京藝術大学日本画専攻卒業。都内デザイン会社勤務後、渡英。帰国後、2013年にQLUTCHを設立。アートディレクションを行う。
          </p>
        </div>

        <p className={styles.credit}>
          portrait painting by{" "}
          <a
            href="http://www.itomari.com/"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.inlineLink}
          >
            ITO Mari
          </a>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Core Services</h2>
        <p className={styles.plain}>
          ヴィジュアル制作 ／ デザイン制作 ／ プロダクション業務 ／ スタイリング ／ ブランディング
        </p>
        <p className={styles.pdfLink}>
          <a
            href="http://mowdown.lolipop.jp/qlutch/pdf/2023_QLUTCH_composite.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.inlineLink}
          >
            Composite [PDF]
          </a>
        </p>
      </section>

      <section className={styles.section} data-major>
        <h2 className={styles.h2}>Book</h2>
        <ul className={styles.datedList}>
          {books.map(([date, title, url]) => (
            <li key={date + title}>
              <span className={styles.date}>{date}</span>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${styles.title} ${styles.inlineLink}`}
                >
                  {title}
                </a>
              ) : (
                <span className={styles.title}>{title}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Award</h2>
        <ul className={styles.datedList}>
          {awards.map(([date, title, url]) => (
            <li key={date + title}>
              <span className={styles.date}>{date}</span>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${styles.title} ${styles.inlineLink}`}
                >
                  {title}
                </a>
              ) : (
                <span className={styles.title}>{title}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Exhibition</h2>
        <ul className={styles.datedList}>
          {exhibitions.map(([date, title, url]) => (
            <li key={date + title}>
              <span className={styles.date}>{date}</span>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${styles.title} ${styles.inlineLink}`}
                >
                  {title}
                </a>
              ) : (
                <span className={styles.title}>{title}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} data-major>
        <h2 className={styles.h2}>Clients + Projects</h2>
        <p className={styles.plain}>{clients}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Office</h2>
        <p className={styles.plain}>
          <a
            href="https://maps.app.goo.gl/8H47mQB277v7zkkf9"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.inlineLink}
          >
            〒150-0021 東京都渋谷区恵比寿西 2-4-6 #202
          </a>
        </p>
      </section>
    </article>
  );
}
