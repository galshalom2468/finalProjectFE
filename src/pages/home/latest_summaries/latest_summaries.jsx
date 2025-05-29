import React from "react";
import styles from "./latest_summaries.module.css";
import { FiFileText} from "react-icons/fi";

export const latestSummaries = [
  { id: 1, title: "מבוא לאלגברה לינארית", subject: "מתמטיקה", date: "לפני 2 שעות" },
  { id: 2, title: "היסטוריה של מלחמת העולם השנייה", subject: "היסטוריה", date: "לפני יום" },
  { id: 3, title: "מושגי יסוד בפיזיקה קוונטית", subject: "פיזיקה", date: "לפני 3 ימים" },
];

export default function LatestSummaries({ summaries }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>סיכומים אחרונים</span>
        <span className={styles.subtitle}>הסיכומים האחרונים שנצפו על ידך</span>
      </div>
      <ul className={styles.list}>
        {summaries.map((item) => (
          <li key={item.id}>
             <FiFileText className={styles.bookmarkIcon} />
            <span className={styles.summaryTitle}>{item.title}</span>
            <span className={styles.subject}>{item.subject}</span>
            <span className={styles.date}>{item.date}</span>
          </li>
          
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <button className={styles.historyButton}>היסטוריית הצפייה שלך</button>
      </div>
    </div>
  );
}
