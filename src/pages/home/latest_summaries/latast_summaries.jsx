import React from "react";
import styles from "./latast_summaries.module.css";
import { FiFileText} from "react-icons/fi";

export const latestSummaries = [
  { id: 1, title: "מבוא לאלגברה לינארית", subject: "מתמטיקה", date: "לפני 2 שעות" },
  { id: 2, title: "היסטוריה של מלחמת העולם השנייה", subject: "היסטוריה", date: "לפני יום" },
  { id: 3, title: "מושגי יסוד בפיזיקה קוונטית", subject: "פיזיקה", date: "לפני 3 ימים" },
];
export const savedSummaries = [
  { id: 1, title: "אלגוריתמים", subject: "מתמטיקה", date: "15.04.25" },
  { id: 2, title: "זמנים בספרות המודרנית", subject: "ספרות", date: "10.04.25" },
  { id: 3, title: "עקרונות הכימיה האורגנית", subject: "כימיה", date: "05.04.25" },
];
export const recommendations = [
  { id: 1, title: "מבנה מערכת העיכול האנושית", stars: 5 },
  { id: 2, title: "עקרונות הפסיכולוגיה הקוגניטיבית", stars: 4 },
  { id: 3, title: "מהפכת התעשייה ותוצאותיה", stars: 5 },
  { id: 4, title: "מבוא לתכנות מונחה עצמים", stars: 4 },
];
export const topics = [
  { id: 1, topic: "מתמטיקה", count: 450 },
  { id: 2, topic: "פיזיקה", count: 320 },
  { id: 3, topic: "היסטוריה", count: 420 },
  { id: 4, topic: "אנגלית", count: 380 },
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
