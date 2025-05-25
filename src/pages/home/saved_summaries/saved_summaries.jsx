import React from "react";
import styles from "./saved_summaries.module.css";
import { FaBookmark } from "react-icons/fa";

export default function SavedSummaries({ summaries }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>הסיכומים השמורים שלי</span>
      </div>
      <ul className={styles.list}>
        {summaries.map((item) => (
          <li key={item.id}>
            <span className={styles.summaryTitle}>{item.title}</span>
            <span className={styles.subject}>{item.subject}</span>
            <span className={styles.dateIcon}>
              <span className={styles.date}>{item.date}</span>
              <FaBookmark className={styles.bookmarkIcon} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}