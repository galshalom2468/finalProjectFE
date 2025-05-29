import React from "react";
import styles from "./popular_topics.module.css";

export const topics = [
  { id: 1, topic: "מתמטיקה", count: 450 },
  { id: 2, topic: "פיזיקה", count: 320 },
  { id: 3, topic: "היסטוריה", count: 420 },
  { id: 4, topic: "אנגלית", count: 380 },
];

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