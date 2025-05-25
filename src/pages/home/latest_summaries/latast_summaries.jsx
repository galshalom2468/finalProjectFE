import React from "react";
import styles from "./latast_summaries.module.css";

export default function LatestSummaries({ summaries }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>סיכומים אחרונים</span>
        <span className={styles.subtitle}>הסיכומים שהועלו לאחרונה</span>
      </div>
      <ul className={styles.list}>
        {summaries.map((item) => (
          <li key={item.id}>
            <span className={styles.summaryTitle}>{item.title}</span>
            <span className={styles.subject}>{item.subject}</span>
            <span className={styles.date}>{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}