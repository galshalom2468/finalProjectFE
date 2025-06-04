import React, { useState } from "react";
import styles from "./history_page.module.css";
import { FiEye, FiClock } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const historyData = [
  {
    id: 1,
    title: "מבוא לפיזיקה קוונטית",
    subject: "מדעים",
    status: "הושלם",
    statusColor: "green",
    date: "לפני 2 שעות",
    readTime: "5 דקות קריאה",
    button: "קרא שוב",
    tagColor: "green",
  },
  {
    id: 2,
    title: "היסטוריה של מלחמת העולם השנייה",
    subject: "היסטוריה",
    status: "בקריאה",
    statusColor: "orange",
    date: "אתמול",
    readTime: "8 דקות קריאה",
    button: "המשך קריאה",
    tagColor: "orange",
  },
  {
    id: 3,
    title: "עקרונות הכלכלה המקרו",
    subject: "כלכלה",
    status: "הושלם",
    statusColor: "green",
    date: "לפני 3 ימים",
    readTime: "6 דקות קריאה",
    button: "קרא שוב",
    tagColor: "green",
  },
  {
    id: 4,
    title: "שפות תכנות מודרניות",
    subject: "טכנולוגיה",
    status: "הושלם",
    statusColor: "green",
    date: "לפני שבוע",
    readTime: "10 דקות קריאה",
    button: "קרא שוב",
    tagColor: "green",
  },
  {
    id: 5,
    title: "מבוא לאלגברה",
    subject: "מתמטיקה",
    status: "הושלם",
    statusColor: "green",
    date: "לפני 8 ימים",
    readTime: "10 דקות קריאה",
    button: "קרא שוב",
    tagColor: "green",
  },
];

export function HistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleBack = () => {
    navigate("/home");
  };

  // סינון לפי שם הסיכום
  const filteredSummaries = historyData.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.historyPage}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>
          <FiClock className={styles.clockIcon} />
          היסטוריית הצפייה 
        </h1>
        <button className={styles.backButton} onClick={handleBack}>חזרה לבית</button>
      </div>
      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          placeholder="חפש בהיסטוריה..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.cardsContainer}>
        {filteredSummaries.map((item) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.cardHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaCircle
                  className={styles.circleIcon}
                  style={{ color: item.statusColor === "green" ? "#1db954" : "#e6a700" }}
                />
                <span className={styles.subjectTag}>
                  {item.subject}
                </span>
              </div>
              <span className={styles.date} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {item.date} <span className={styles.readTime}>· {item.readTime}</span>
                <FiEye className={styles.eyeIconSmall} />
              </span>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardTitle}>{item.title}</span>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.status} style={{ color: item.statusColor === "green" ? "#1db954" : "#e6a700" }}>
                {item.status}
              </span>
              <button className={styles.actionButton}>{item.button}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}