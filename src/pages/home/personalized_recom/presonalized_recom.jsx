import React from "react";
import styles from "./personalized_recom.module.css";
import { FaStar, FaRegStar } from "react-icons/fa";

export const recommendations = [
  { id: 1, title: "מבנה מערכת העיכול האנושית", subject: "ביולוגיה", views: 982, rating: 4.7 },
  { id: 2, title: "עקרונות הפסיכולוגיה הקוגניטיבית", subject: "פסיכולוגיה", views: 1245, rating: 4.8 },
  { id: 3, title: "מהפכת התעשייה ותוצאותיה", subject: "היסטוריה", views: 845, rating: 4.5 },
  { id: 4, title: "מבוא לתכנות מונחה עצמים", subject: "מדעי המחשב", views: 1567, rating: 4.9 },
];

function SummaryCard({ title, subject, views, rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subject}>{subject}</div>
      <div className={styles.views}>צפיות {views.toLocaleString()}</div>
      <div className={styles.starsRow}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className={styles.star} />
        ))}
        {hasHalf && <FaStar className={styles.starHalf} style={{ opacity: 0.5 }} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className={styles.starEmpty} />
        ))}
        <span className={styles.rating}>{rating.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default function PersonalizedRecommendations({ summaries }) {
  return (
    <div>
      <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.mainTitle}>המלצות מותאמות אישית</span>
        <span className={styles.subtitle}>סיכומים שעשויים לעניין אותך בהתבסס על פעילות קודמת</span>
      </div>
      <div className={styles.cardsGrid}>
        {summaries.map((item) => (
          <SummaryCard
            key={item.id}
            title={item.title}
            subject={item.subject}
            views={item.views}
            rating={item.rating}
          />
        ))}
      </div>
      </div>
      </div>
  );
}

