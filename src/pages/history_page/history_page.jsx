import React, { useState, useEffect } from "react";
import styles from "./history_page.module.css";
import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../config/supabase';
import { getAuth } from "firebase/auth";

export function HistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user ? user.uid : null;

      console.log('userId:', userId);

      if (!userId) {
        setHistoryData([]);
        return;
      }

      const { data, error } = await supabase
        .from('history')
        .select('id, viewed_at, summary_id, summaries (title)')
        .order('viewed_at', { ascending: false })
        .limit(20);
      
      console.log('historyData:', data, error);

      if (error) {
        console.error('שגיאה בטעינת ההיסטוריה:', error);
      } else {
        setHistoryData(data);
      }
    }
    fetchHistory();
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  const handleView = async (id) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('history')
        .insert([{ 
          summary_id: id,
          user_id: user.uid,
          viewed_at: new Date().toISOString()
        }]);
    }
    navigate(`/summary/${id}`);
  };

  const uniqueSummariesMap = new Map();
  historyData.forEach(item => {
    if (!uniqueSummariesMap.has(item.summary_id)) {
      uniqueSummariesMap.set(item.summary_id, item);
    }
  });
  const uniqueSummaries = Array.from(uniqueSummariesMap.values());

  const filteredSummaries = uniqueSummaries.filter(item =>
    item.summaries?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.historyPage}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>
          <FiClock className={styles.clockIcon} />
           הסיכומים האחרונים
        </h1>
        <button 
          id="backButton"
          name="backButton"
          className={styles.backButton} 
          onClick={handleBack}
        >
          חזרה לבית
        </button>
      </div>
      <div className={styles.searchRow}>
        <input
          id="historySearch"
          name="historySearch"
          className={styles.searchInput}
          placeholder="חפש בהיסטוריה..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.cardsContainer}>
        {historyData.length === 0 && (
          <div className={styles.emptyMsg}>לא נמצאו סיכומים אחרונים</div>
        )}
        {filteredSummaries.map((item) => (
          <div
            className={styles.card}
            key={item.id}
            onClick={() => navigate(`/summary/${item.summary_id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.summaryId}>#{item.summary_id}</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span className={styles.date}>
                  {new Date(item.viewed_at).toLocaleDateString('he-IL')}
                </span>
                <span className={styles.time}>
                  {new Date(item.viewed_at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardTitle}>{item.summaries?.title || "סיכום"}</span>
            </div>
            <div className={styles.cardFooter}>
              <button 
                className={styles.actionButton}
                onClick={e => {
                  e.stopPropagation();
                  handleView(item.summary_id);
                }}
              >
                צפה
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}