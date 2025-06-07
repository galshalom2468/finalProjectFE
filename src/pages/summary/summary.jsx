import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import styles from './summary.module.css';
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { getAuth } from "firebase/auth";

export function Summary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signedUrl, setSignedUrl] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminRole() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.uid)
          .single();
        
        if (!error && data && data.role === 'admin') {
          setIsAdmin(true);
        }
      }
    }
    checkAdminRole();
  }, []);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const { data, error } = await supabase
          .from('summaries')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setSummary(data);
      } catch (err) {
        console.error('Error fetching summary:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [id]);

  useEffect(() => {
    async function getSignedUrl() {
      if (summary && summary.file_url) {
        const { data, error } = await supabase
          .storage
          .from('summaries')
          .createSignedUrl(summary.file_url, 60 * 60); 
        if (data) setSignedUrl(data.signedUrl);
      }
    }
    getSignedUrl();
  }, [summary]);

  const handleRate = async (rating) => {
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('summaries')
      .update({ rating: rating })
      .eq('id', id);

    if (!error) {
      setUserRating(rating);
      setSummary((prev) => ({ ...prev, rating }));
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הסיכום?')) {
      try {
        const { error } = await supabase
          .from('summaries')
          .delete()
          .eq('id', id);

        if (error) throw error;
        navigate('/library');
      } catch (err) {
        console.error('Error deleting summary:', err);
        alert('שגיאה במחיקת הסיכום');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <div className={styles.loading}>טוען...</div>;
  if (error) return <div className={styles.error}>שגיאה: {error}</div>;
  if (!summary) return <div className={styles.error}>הסיכום לא נמצא</div>;

  return (
    <div className={styles.summaryPage}>
      <div className={styles.grid}>

        <div className={styles.sidePanel}>
          <button 
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            חזרה
          </button>
          <h1 className={styles.title}>{summary.title}</h1>
          {isAdmin && (
            <div className={styles.adminControls}>
              <button 
                className={styles.editButton}
                onClick={handleEdit}
              >
                <FaEdit /> ערוך
              </button>
              <button 
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                <FaTrash /> מחק
              </button>
            </div>
          )}
          <div className={styles.ratingBox}>
            <span className={styles.ratingLabel}>דרג את הסיכום:</span>
            {[1,2,3,4,5].map((star) => (
              <FaStar
                key={star}
                className={styles.star}
                color={(hoverRating || userRating || summary.rating) >= star ? "#ffc107" : "#e4e5e9"}
                size={28}
                style={{ cursor: isSubmitting ? "not-allowed" : "pointer", transition: "color 0.2s" }}
                onMouseEnter={() => !isSubmitting && setHoverRating(star)}
                onMouseLeave={() => !isSubmitting && setHoverRating(0)}
                onClick={() => !isSubmitting && handleRate(star)}
              />
            ))}
            {isSubmitting && <span className={styles.saving}>שומר...</span>}
          </div>
          <div className={styles.metaBox}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>מקצוע:</span>
              <span className={styles.metaValue}>{summary.subject}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>תאריך:</span>
              <span className={styles.metaValue}>
                {new Date(summary.date).toLocaleDateString('he-IL')}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.contentPanel}>
          <div className={styles.contentTitle}>תוכן הסיכום</div>
          <div className={styles.text}>
            {summary.content}
            {summary.file_url && signedUrl && (
              <div className={styles.fileBox}>
                <a
                  href={signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadButton}
                >
                  הורד/י קובץ מצורף
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 