import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { FaBell, FaSignOutAlt } from "react-icons/fa"; 
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import LatestSummaries from "./latest_summaries/latest_summaries";
import SavedSummaries from "./saved_summaries/saved_summaries";
import PersonalizedRecommendations from "./personalized_recom/presonalized_recom";
import PopularTopics from "./popular_topics/popular_topics";
import FooterHome from "./footer_home/footer_home";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export function Home() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              id="libraryButton"
              name="libraryButton"
              className={styles.libraryButton} 
              onClick={() => navigate("/library")}
            >
              לכל הסיכומים
            </button>
            <button
              id="newSummaryButton"
              name="newSummaryButton"
              className={styles.libraryButton}
              style={{ background: '#1db954', color: 'white' }}
              onClick={() => navigate("/create")}
            >
              צור סיכום חדש
            </button>
            {isAdmin && (
              <button
                id="dashboardButton"
                name="dashboardButton"
                className={styles.libraryButton}
                style={{ background: '#2563eb', color: 'white' }}
                onClick={() => navigate("/dashboard")}
              >
                דשבורד
              </button>
            )}
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
        </div>
        <div className={styles.gridContainer}>
          <section className={styles.latestCard}>
            <LatestSummaries />
          </section>
          <section className={styles.savedCard}>
            <SavedSummaries />
          </section>
          <section className={styles.recommendationsCard}>
            <PersonalizedRecommendations />
          </section>
          <section className={styles.topicsCard}>
            <PopularTopics />
          </section>
        </div>
      </main>
      <FooterHome />
    </div>
  );
}