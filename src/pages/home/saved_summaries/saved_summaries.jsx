import React from "react";
import styles from "./saved_summaries.module.css";
import { FaBookmark } from "react-icons/fa";

export const savedSummaries = [
  { id: 1, title: "מבוא לאלגברה לינארית", subject: "מתמטיקה", date: "לפני 2 שעות" },
  { id: 2, title: "היסטוריה של מלחמת העולם השנייה", subject: "היסטוריה", date: "לפני יום" },
  { id: 3, title: "מושגי יסוד בפיזיקה", subject: "פיזיקה", date: "לפני 3 ימים" },
];

export default function SavedSummaries({ summaries }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>הסיכומים השמורים שלי</span>
      </div>
      <ul className={styles.list}>
        {summaries.map((item) => (
          <li key={item.id}>
            <FaBookmark className={styles.bookmarkIcon} />
            <span className={styles.summaryTitle}>{item.title}</span>
            <span className={styles.subject}>{item.subject}</span>
            <span className={styles.dateIcon}>
              <span className={styles.date}>{item.date}</span>
              
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}