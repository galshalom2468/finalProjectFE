import React from "react";
import styles from "./personalized_recom.module.css";
import { FaStar } from "react-icons/fa";

export default function PersonalizedRecommendations({ recommendations }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>המלצות מותאמות אישית</span>
      </div>
      <ul className={styles.list}>
        {recommendations.map((item) => (
          <li key={item.id}>
            <span className={styles.summaryTitle}>{item.title}</span>
            <span className={styles.stars}>
              {[...Array(item.stars)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}