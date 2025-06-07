import React, { useState, useEffect } from "react";
import styles from "./library.module.css";
import { FaSearch, FaStar, FaRegStar, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from '../../config/supabase';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export function Library() {
  const [summaries, setSummaries] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialFilter = params.get("subject") || "";
  const [filter, setFilter] = useState(initialFilter);
  const navigate = useNavigate();
  const [savedSummaries, setSavedSummaries] = useState([]);
  const [recentSummaries, setRecentSummaries] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminRole() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        }
      }
    }
    checkAdminRole();
  }, []);

  useEffect(() => {
    async function fetchSummaries() {
      const { data, error } = await supabase
        .from('summaries')
        .select('*');
      if (error) {
        console.error('שגיאה בטעינת הסיכומים:', error);
      } else {
        console.log('data:', data);
        setSummaries(data);
      }
    }
    fetchSummaries();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilter(params.get("subject") || "");
  }, [location.search]);

  const filteredSummaries = summaries.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? item.subject === filter : true)
  );

  const subjects = Array.from(new Set(summaries.map(item => item.subject)));

  const handleSave = async (id) => {
    const summary = summaries.find(s => s.id === id);
    const newIsSaved = !summary.is_saved;

  
    const { error } = await supabase
      .from('summaries')
      .update({ is_saved: newIsSaved })
      .eq('id', id);

    if (error) {
      alert("שגיאה בשמירת הסיכום");
      return;
    }


    setSummaries(summaries.map(s =>
      s.id === id ? { ...s, is_saved: newIsSaved } : s
    ));
  };

  const handleView = async (id) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    if (!userId) {
      alert('משתמש לא מחובר');
      return;
    }

    const { error } = await supabase
      .from('history')
      .insert([{ 
        summary_id: id,
        user_id: userId,
        viewed_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error adding to history:', error);
      return;
    }

    setRecentSummaries((prev) => {
      const filtered = prev.filter(sid => sid !== id);
      return [id, ...filtered].slice(0, 10);
    });
    navigate(`/summary/${id}`);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הסיכום?')) {
      try {
        const { error: summaryError } = await supabase
          .from('summaries')
          .delete()
          .eq('id', id);

        const { error: historyError } = await supabase
          .from('history')
          .delete()
          .eq('summary_id', id);

        if (summaryError || historyError) {
          throw summaryError || historyError;
        }

        setSummaries(summaries.filter(s => s.id !== id));
      } catch (err) {
        console.error('Error deleting summary:', err);
        alert('שגיאה במחיקת הסיכום');
      }
    }
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/create/${id}`);
  };

  return (
    <div className={styles.libraryPage}>
      <header className={styles.header}>
        <div className={styles.logoSection} onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}>
          <span className={styles.logoSquare}></span>
          <span className={styles.logoText}>סיכומים</span>
        </div>
        <nav className={styles.navLinks}>
          <button onClick={() => navigate("/home")}>דף הבית</button>
          <button onClick={() => navigate("/history_page")}>היסטוריה</button>
        </nav>
      </header>
      <div className={styles.Container}>
        {recentSummaries.length > 0 && (
          <div className={styles.recentSummariesSection}>
            <h3 className={styles.recentSummariesTitle}>הסיכומים האחרונים שצפית בהם</h3>
            <div className={styles.recentSummariesList}>
              {recentSummaries.map((item, idx) => (
                <div key={item.id || idx} className={styles.recentSummaryCard}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.subject}>{item.subject}</div>
                  <div className={styles.date}>{formatDate(item.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.searchFilterRow}>
          <div className={styles.searchInputWrapper}>
            <input
              className={styles.searchInput}
              placeholder="חפש סיכום..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <FaSearch className={styles.searchIcon} />
          </div>
          <select
            className={styles.filterSelect}
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">כל המקצועות</option>
            {subjects.map(subj => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
          <button
            className={styles.createSummaryButton}
            onClick={() => navigate("/create")}
          >
            צור סיכום חדש
          </button>
        </div>
        <div className={styles.cardsGrid}>
          {filteredSummaries.map(item => (
            <div
              key={item.id}
              className={`${styles.card} ${item.is_saved ? styles.savedCard : ""}`}
              onClick={() => handleView(item.id)}
            >
              <div className={styles.title}>{item.title}</div>
              <div className={styles.subject}>{item.subject}</div>
              <div className={styles.date}>{formatDate(item.date)}</div>
              <div className={styles.starsRow}>
                {renderStars(item.rating)}
                <span className={styles.rating}>{item.rating ? item.rating.toFixed(1) : "0.0"}</span>
              </div>
              <div className={styles.cardActions} onClick={e => e.stopPropagation()}>
                <button
                  className={styles.saveBtn}
                  onClick={() => handleSave(item.id)}
                >
                  {item.is_saved ? "הסר שמירה" : "שמור"}
                </button>
              </div>
              {isAdmin && (
                <div className={styles.adminControls}>
                  <button 
                    className={styles.editButton}
                    onClick={(e) => handleEdit(item.id, e)}
                  >
                    <FaEdit /> ערוך
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={(e) => handleDelete(item.id, e)}
                  >
                    <FaTrash /> מחק
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ id, title, subject, date, rating, isSaved, onSave, onView }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.1;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div
      className={
        styles.card + (isSaved ? ' ' + styles.savedCard : '')
      }
      onClick={() => onView(id)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.subject}>{subject}</div>
      <div className={styles.date}>{formatDate(date)}</div>
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
      <div className={styles.cardActions} onClick={e => e.stopPropagation()}>
        <button
          className={styles.viewBtn}
          onClick={() => onView(id)}
        >
          צפה
        </button>
        <button
          className={styles.saveBtn}
          onClick={() => onSave(id)}
        >
          {isSaved ? "הסר שמירה" : "שמור"}
        </button>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'לפני רגע';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `לפני ${minutes} דקות`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `לפני ${hours} שעות`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `לפני ${days} ימים`;
  } else {
    return date.toLocaleDateString('he-IL');
  }
}

function renderStars(rating = 0) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} style={{ color: "#FFD700", marginLeft: 2 }} />
      ))}
      {hasHalf && <FaStar key="half" style={{ color: "#FFD700", opacity: 0.5, marginLeft: 2 }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} style={{ color: "#FFD700", marginLeft: 2 }} />
      ))}
    </>
  );
}
