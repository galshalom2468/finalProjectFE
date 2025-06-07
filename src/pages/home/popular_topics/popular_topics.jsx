import React, { useState, useEffect } from "react";
import styles from "./popular_topics.module.css";
import { supabase } from '../../../config/supabase';
import { useNavigate } from "react-router-dom";

export default function PopularTopics() {
  const [popularTopics, setPopularTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPopularTopics() {
      const { data, error } = await supabase.rpc('get_popular_topics');
      if (error) {
        console.error('שגיאה בטעינת הנושאים הפופולריים:', error);
      } else {
        setPopularTopics(data);
      }
    }
    fetchPopularTopics();
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>נושאים פופולריים</span>
      </div>
      <ul className={styles.list}>
        {popularTopics.map((item, idx) => (
          <li
            key={item.subject}
            className={`${styles.listItem} ${styles[`bg${idx + 1}`]}`}
            onClick={() => navigate(`/library?subject=${encodeURIComponent(item.subject)}`)}
          >
            <span className={styles.topic}>{item.subject}</span>
            <span className={styles.count}>{item.count} סיכומים</span>
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <button className={styles.discoverAllButton}>גלה עוד נושאים</button>
      </div>
    </div>
  );
}