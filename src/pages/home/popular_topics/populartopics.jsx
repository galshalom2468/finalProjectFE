import React from "react";
import styles from "./popular_topics.module.css";

export default function PopularTopics({ topics }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>נושאים פופולריים</span>
      </div>
      <ul className={styles.list}>
        {topics.map((item) => (
          <li key={item.id}>
            <span className={styles.topic}>{item.topic}</span>
            <span className={styles.count}>{item.count} סיכומים</span>
          </li>
        ))}
      </ul>
    </div>
  );
}