import React, { useState, useEffect } from "react";
import styles from "./latest_summaries.module.css";
import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../../config/supabase';

export default function LatestSummaries() {
  const navigate = useNavigate();
  const [latestSummaries, setLatestSummaries] = useState([]);

  useEffect(() => {
    async function fetchLatestSummaries() {
      const { data, error } = await supabase
        .from('history')
        .select('id, viewed_at, summary_id, summaries (title, subject, date)')
        .order('viewed_at', { ascending: false })
        .limit(20); // נביא 20 כדי לוודא שיש מספיק ייחודיים

      if (error) {
        console.error('שגיאה בטעינת הסיכומים האחרונים:', error);
      } else {
        // בנה מערך ייחודי של סיכומים (כל סיכום פעם אחת בלבד)
        const uniqueMap = new Map();
        data.forEach(item => {
          if (!uniqueMap.has(item.summary_id)) {
            uniqueMap.set(item.summary_id, item);
          }
        });
        const uniqueSummaries = Array.from(uniqueMap.values()).slice(0, 4); // רק 4 אחרונים
        setLatestSummaries(uniqueSummaries);
      }
    }
    fetchLatestSummaries();
  }, []);

  const handleHistoryClick = () => {
    navigate("/history_page");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>סיכומים אחרונים</span>
        <span className={styles.subtitle}>הסיכומים האחרונים שנצפו</span>
      </div>
      <ul className={styles.list}>
        {latestSummaries.map((item) => (
          <li key={item.id} onClick={() => navigate(`/summary/${item.summary_id}`)} style={{cursor: "pointer"}}>
             <FiFileText className={styles.bookmarkIcon} />
            <span className={styles.summaryTitle}>{item.summaries?.title}</span>
            <span className={styles.subject}>{item.summaries?.subject}</span>
            <span className={styles.date}>{item.summaries?.date ? formatDate(item.summaries.date) : ""}</span>
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <button className={styles.historyButton} onClick={handleHistoryClick}>צפה בהיסטוריית הצפייה</button>
      </div>
    </div>
  );
}
