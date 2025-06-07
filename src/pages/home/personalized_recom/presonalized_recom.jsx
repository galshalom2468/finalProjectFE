import React, { useState, useEffect } from "react";
import styles from "./personalized_recom.module.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { supabase } from '../../../config/supabase';
import { useNavigate } from "react-router-dom";

function SummaryCard({ id, title, subject, rating, onClick }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={styles.card} onClick={onClick} style={{ cursor: "pointer" }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subject}>{subject}</div>
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

export default function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecommendations() {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .order('rating', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('שגיאה בטעינת ההמלצות:', error);
      } else {
        setRecommendations(data);
      }
    }
    fetchRecommendations();
  }, []);

  return (
    <div>
      <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.mainTitle}>המלצות מותאמות אישית</span>
        <span className={styles.subtitle}>סיכומים שעשויים לעניין אותך בהתבסס על פעילות קודמת</span>
      </div>
      <div className={styles.cardsGrid}>
          {recommendations.map((item) => (
          <SummaryCard
            key={item.id}
              id={item.id}
            title={item.title}
            subject={item.subject}
            rating={item.rating}
              onClick={() => navigate(`/summary/${item.id}`)}
          />
        ))}
      </div>
      </div>
      </div>
  );
}

