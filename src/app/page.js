import styles from "./page.module.css";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import HighRate from "./components/highRate";

export default function Home() {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} className={styles.page}>
      <NavBar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>
              מוצאים את <span className={styles.primary}>המקום הבא</span> שלכם
            </h1>
            <p>
              אתר המלצות חכם למסעדות, טיולים ואטרקציות. הכל בעברית, מותאם אליך.
            </p>

            <div className={styles.heroTags}>
              <span className={styles.tag}>מסעדות בטמרה</span>
              <span className={styles.tag}>טיולים בצפון</span>
              <span className={styles.tag}>אטרקציות למשפחות</span>
            </div>

            <Search />
          </div>
          <HighRate />
        </section>

        <div className={styles.spacer}>
        </div>
        <div className={styles.featuresSection}>
          <div className={styles.container}>


            <h3 className={styles.title}>
              אתר שמרכז עבורכם את כל המקומות השווים, המסעדות המומלצות והאטרקציות המיוחדות — במקום אחד.
            </h3>

            <div className={styles.grid}>

              <div className={styles.card}>
                <h3>הבחירות המובילות ⭐</h3>
                <p>
                  אנחנו מציגים עבורכם את המקומות המדורגים ביותר לפי ביקורות משתמשים, איכות השירות והחוויה הכוללת.
                </p>
              </div>

              <div className={styles.card}>
                <h3>בחירת מסעדות 🍽️</h3>
                <p>
                  סינון מסעדות לפי דירוג, סוג מטבח, אזור, טווח מחירים וחוות דעת — כדי שתמצאו בדיוק את מה שמתאים לכם.
                </p>
              </div>

              <div className={styles.card}>
                <h3>גילוי מקומות 📍</h3>
                <p>
                  אטרקציות, טיולים, ערים ויעדים מיוחדים ברחבי ישראל — מפינות נסתרות ועד אתרים מוכרים.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      <section className={styles.reviewsSection}>
        <h2 className={styles.title}>מה המשתמשים שלנו אומרים</h2>

        <div className={styles.grid}>

          <div className={styles.reviewCard}>
            <p className={styles.text}>
              “מצאתי מסעדות מדהימות בצפון שלא הכרתי בכלל. האתר פשוט מושלם!”
            </p>
            <span className={styles.user}>— רנא, חיפה</span>
          </div>

          <div className={styles.reviewCard}>
            <p className={styles.text}>
              “אהבתי את הסינון לפי סוג מטבח. מצאתי בדיוק מה שחיפשתי.”
            </p>
            <span className={styles.user}>— עומר, תל אביב</span>
          </div>

          <div className={styles.reviewCard}>
            <p className={styles.text}>
              “ההמלצות מדויקות והכל בעברית. חוויה מעולה!”
            </p>
            <span className={styles.user}>— סמאח, נצרת</span>
          </div>

        </div>
      </section>



      <div className={styles.spacer2}>
      </div>

      <div>
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>

            <div className={styles.logoArea}>
              <h2 className={styles.logo}>ExploreIt</h2>
              <p className={styles.tagline}>
                מגלים מקומות, מסעדות ואטרקציות ברחבי ישראל — במקום אחד.
              </p>
            </div>

            <div className={styles.links}>
              <h3>ניווט מהיר</h3>
              <ul>
                <li>מסעדות</li>
                <li>אטרקציות</li>
                <li>טיולים</li>
                <li>מקומות קרובים</li>
              </ul>
            </div>

            <div className={styles.about}>
              <h3>על האתר</h3>
              <p>
                האתר נבנה כדי לעזור לכם למצוא את המקומות הכי טובים בישראל —
                עם דירוגים אמיתיים, חוות דעת, וסינון חכם לפי מה שמתאים לכם.
              </p>
            </div>

          </div>

          <div className={styles.bottomBar}>
            <p>© 2026 ExploreIt — כל הזכויות שמורות</p>
          </div>
        </footer>
      </div>
    </div>
  );
}