import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa"; 
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import LatestSummaries, { latestSummaries } from "./latest_summaries/latest_summaries";
import SavedSummaries, { savedSummaries } from "./saved_summaries/saved_summaries";
import PersonalizedRecommendations, { recommendations } from "./personalized_recom/presonalized_recom";
import PopularTopics, { topics } from "./popular_topics/populartopics";
import FooterHome from "./footer_home/footer_home";


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
          <p>נותרו לך 7 סיכומים להשלים השבוע</p>
        </div>
        <div className={styles.gridContainer}>
          <section className={styles.latestCard}>
            <LatestSummaries summaries={latestSummaries} />
          </section>
          <section className={styles.savedCard}>
            <SavedSummaries summaries={savedSummaries} />
          </section>
          <section className={styles.recommendationsCard}>
            <PersonalizedRecommendations summaries={recommendations} />
          </section>
          <section className={styles.topicsCard}>
            <PopularTopics topics={topics} />
          </section>
        </div>
      </main>
      <FooterHome />
    </div>
  );
}