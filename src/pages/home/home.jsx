import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa"; 
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import LatestSummaries from "./latest_summaries/latast_summaries";
import SavedSummaries from "./saved_summaries/saved_summaries";
import PersonalizedRecommendations from "./personalized_recom/presonalized_recom";
import PopularTopics from "./popular_topics/populartopics";

export function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const userName = user?.displayName || "אורח";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };


  const latestSummaries = [
    { id: 1, title: "מבוא לאלגברה לינארית", subject: "מתמטיקה", date: "לפני 2 שעות" },
    { id: 2, title: "היסטוריה של מלחמת העולם השנייה", subject: "היסטוריה", date: "לפני יום" },
    { id: 3, title: "מושגי יסוד בפיזיקה קוונטית", subject: "פיזיקה", date: "לפני 3 ימים" },
  ];
  const savedSummaries = [
    { id: 1, title: "אלגוריתמים", subject: "מתמטיקה", date: "15.04.25" },
    { id: 2, title: "זמנים בספרות המודרנית", subject: "ספרות", date: "10.04.25" },
    { id: 3, title: "עקרונות הכימיה האורגנית", subject: "כימיה", date: "05.04.25" },
  ];
  const recommendations = [
    { id: 1, title: "מבנה מערכת העיכול האנושית", stars: 5 },
    { id: 2, title: "עקרונות הפסיכולוגיה הקוגניטיבית", stars: 4 },
    { id: 3, title: "מהפכת התעשייה ותוצאותיה", stars: 5 },
    { id: 4, title: "מבוא לתכנות מונחה עצמים", stars: 4 },
  ];
  const topics = [
    { id: 1, topic: "מתמטיקה", count: 450 },
    { id: 2, topic: "פיזיקה", count: 320 },
    { id: 3, topic: "היסטוריה", count: 420 },
    { id: 4, topic: "אנגלית", count: 380 },
  ];

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <span className={styles.logoSquare}></span>
          <span className={styles.logoText}>סיכומים</span>
        </div>
        <div className={styles.searchContainer}>
          <input className={styles.searchInput} placeholder="חפש סיכומים..." dir="rtl" />
          <FaSearch className={styles.searchIcon} />
        </div>
        <div className={styles.userSection}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.notifications}>
            <FaBell />
            <span className={styles.badge}>3</span>
          </span>
          <span className={styles.logout} onClick={handleLogout}>
            <FaSignOutAlt style={{ marginLeft: "0.4em", verticalAlign: "middle" }} />
            התנתק
          </span>
        </div>
      </header>
      <main className={styles.mainContent}>
        <div className={styles.greetingSection}>
          <h1>שלום, {userName}!</h1>
          <p>נותרו לך 7 סיכומים להשלמת השבוע</p>
        </div>
        <div className={styles.gridContainer}>
          <section className={styles.latestCard}>
            <LatestSummaries summaries={latestSummaries} />
          </section>
          <section className={styles.savedCard}>
            <SavedSummaries summaries={savedSummaries} />
          </section>
          <section className={styles.recommendationsCard}>
            <PersonalizedRecommendations recommendations={recommendations} />
          </section>
          <section className={styles.topicsCard}>
            <PopularTopics topics={topics} />
          </section>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <span className={styles.logoSquare}></span>
            <span className={styles.logoText}>סיכומים</span>
          </div>
          <nav className={styles.footerNav}>
            <a href="/terms">תנאי שימוש</a>
            <span className={styles.footerDivider}>|</span>
            <a href="/privacy">פרטיות</a>
            <span className={styles.footerDivider}>|</span>
            <a href="/help">עזרה</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}