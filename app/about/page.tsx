import type { Metadata } from "next";
import { Budoux } from "@/components/budoux";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "QLUTCH【クラッチ】は、ブランドに必要な問いを整理し、方向性を示すクリエイティブプロダクションです。",
};

const books = [
  ["2019.7", "PAPER STOCK MEMBERS CREATORS FILE"],
  ["2019.3", "デザイン・メイキング 167 デザイナーのラフスケッチ実例集 Vol.2"],
  ["2019.2", "MdN デザイナーズファイル 2019"],
  ["2019.1", "デザインノート No.83"],
  ["2018.3", "デザイン・メイキング 152 デザイナーのラフスケッチ実例集"],
  ["2018.2", "MdN デザイナーズファイル 2018"],
  ["2017.9", "デザインノート No.75"],
  ["2017.3", "デザイナーのアイデア戦略 発想を生み出すデザインのスケッチ実例集"],
  ["2017.2", "MdN デザイナーズファイル 2017"],
  ["2016.3", "デザイナーのラフスケッチ デザインのアイデアを形にする過程"],
  ["2016.2", "MdN デザイナーズファイル 2016"],
  ["2015.11", "プロとして恥ずかしくない 新・デザインの大原則"],
  ["2015.2", "MdN デザイナーズファイル 2015"],
];

const awards = [["2016.6", "カンヌライオンズ 2016 PR Bronze"]];

const exhibitions = [
  ["2026.1", "「クリエイター 100 人からの年賀状」展 vol.21 ／ 竹尾見本帖本店"],
  ["2025.1", "「クリエイター 100 人からの年賀状」展 vol.20 ／ 竹尾見本帖本店"],
  ["2024.1", "「クリエイター 100 人からの年賀状」展 vol.19 ／ 竹尾見本帖本店"],
  ["2023.1", "「クリエイター 100 人からの年賀状」展 vol.18 ／ 竹尾見本帖本店"],
  ["2022.1", "「クリエイター 100 人からの年賀状」展 vol.17 ／ 竹尾見本帖本店"],
  ["2021.1", "「クリエイター 100 人からの年賀状」展 vol.16 ／ 竹尾見本帖本店"],
  ["2020.6", "「Fine paper, Fine work 展」vol.06 ／ 竹尾青山見本帖"],
  ["2020.1", "「クリエイター 100 人からの年賀状」展 vol.15 ／ 竹尾見本帖本店"],
  ["2019.1", "「クリエイター 100 人からの年賀状」展 vol.14 ／ 竹尾見本帖本店"],
  ["2018.1", "「クリエイター 100 人からの年賀状」展 vol.13 ／ 竹尾見本帖本店"],
];

const clients =
  "AGF, AiiA, Aimeine, allureville, ANA, ANAYI, ANNA SUI, au, audio-technica, BCL COMPANY, Black Magazine (New Zealand), Canon, CRESTBRIDGE, CyberZ, DOROAS, Dr.Jart+, Ezaki Glico, heroine make (Global), IMA RED, Imju, I-ne, iRobot, ISEHAN, JILL STUART, KANEBO, KEITA MARUYAMA, KISSME I (China), KODA KUMI LIVE TOUR 2017 ～W FACE～, KOSE, KURABO, LADIT, Laforet, LANVIN en Bleu, LVMH (Paris), Meiji, MiMC, MN, NAIGAI, NISHIKAWA, NISSIN FOODS, NowLd, OPERA, PANTONE, PAUL & JOE, Peclers Paris, re-quest QJ, SANYO SHOKAI, SEABREEZE, SHISEIDO, Sony Music, SPUR, SUNTORY, To b. by agnès b., 東京都庭園美術館, TOYOTA, Vendome Aoyama, Vivienne Westwood, VOLVO, etc.";

export default function AboutPage() {
  return (
    <article className={styles.article}>
      <Budoux>
        <p className={styles.lede}>
          QLUTCH【クラッチ】は、ブランドに必要な問いを整理し、
          <br />
          方向性を示すクリエイティブプロダクションです。
          <br />
          ヴィジュアルディレクション、グラフィック デザインを統合し、
          <br />
          構想から制作まで一貫して担います。
          <br />
          言語化を起点に、意思決定の精度を高め、表現へと導きます。
        </p>
      </Budoux>

      <section className={styles.section}>
        <h2 className={styles.h2}>Creators</h2>

        <div className={styles.creator}>
          <p className={styles.role}>Creative Director</p>
          <p className={styles.name}>
            戎田 夏菜 <span className={styles.romaji}>EBISUDA Kana</span>
          </p>
          <Budoux>
            <p className={styles.bio}>
              横浜生まれ。文化服装学院情報科卒。雑誌社編集部、国内外ブランド PR、
              <br />
              アーティストマネージメントおよびプロダクション業を経て、 渡英。
              <br />
              帰国後、2013年にQLUTCHを設立。
              <br />
              ヴィジュアルディレクション、スタイリングを 行う。
            </p>
          </Budoux>
        </div>

        <div className={styles.creator}>
          <p className={styles.role}>Art Director + Graphic Designer</p>
          <p className={styles.name}>
            佐々木 猛 <span className={styles.romaji}>SASAKI Takeshi</span>
          </p>
          <Budoux>
            <p className={styles.bio}>
              東京生まれ。東京藝術大学日本画専攻卒業。都内デザイン会社勤務後、渡英。
              <br />
              帰国後、2013年にQLUTCHを設立。
              <br />
              アートディレクションを 行う。
            </p>
          </Budoux>
        </div>

        <p className={styles.credit}>portrait painting by ITO Mari</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>事業内容</h2>
        <p className={styles.plain}>
          ヴィジュアル制作 ／ プロダクション業務 ／ デザイン制作 ／ スタイリング ／ ブランディング
        </p>
      </section>

      <section className={styles.section} data-major>
        <h2 className={styles.h2}>Book</h2>
        <ul className={styles.datedList}>
          {books.map(([date, title]) => (
            <li key={date + title}>
              <span className={styles.date}>{date}</span>
              <span className={styles.title}>{title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Award</h2>
        <ul className={styles.datedList}>
          {awards.map(([date, title]) => (
            <li key={date + title}>
              <span className={styles.date}>{date}</span>
              <span className={styles.title}>{title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Exhibition</h2>
        <ul className={styles.datedList}>
          {exhibitions.map(([date, title]) => (
            <li key={date + title}>
              <span className={styles.date}>{date}</span>
              <span className={styles.title}>{title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} data-major>
        <h2 className={styles.h2}>Clients and Projects</h2>
        <p className={styles.plain}>{clients}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Office</h2>
        <p className={styles.plain}>
          〒150-0021 東京都渋谷区恵比寿西 2-4-6 #202
        </p>
      </section>
    </article>
  );
}
