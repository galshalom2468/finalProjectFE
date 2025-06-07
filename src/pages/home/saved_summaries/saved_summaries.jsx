import React, { useState, useEffect } from "react";
import styles from "./saved_summaries.module.css";
import { FaBookmark } from "react-icons/fa";
import { supabase } from '../../../config/supabase';
import { useNavigate } from "react-router-dom";

export default function SavedSummaries() {
  const [savedSummaries, setSavedSummaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSavedSummaries() {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .eq('is_saved', true)
        .limit(4);
      
      if (error) {
        console.error('שגיאה בטעינת הסיכומים השמורים:', error);
      } else {
        setSavedSummaries(data);
      }
    }
    fetchSavedSummaries();
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>הסיכומים השמורים שלי</span>
      </div>
      <ul className={styles.list}>
        {savedSummaries.map((item) => (
          <li
            key={item.id}
            onClick={() => navigate(`/summary/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            <FaBookmark className={styles.bookmarkIcon} />
            <span className={styles.summaryTitle}>{item.title}</span>
            <span className={styles.subject}>{item.subject}</span>
            <span className={styles.dateIcon}>
              <span className={styles.date}>
                {new Date(item.date).toLocaleDateString('he-IL')}
              </span>  
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <button className={styles.allSavedButton}>נהל סיכומים שמורים</button>
      </div>
    </div>
  );
}