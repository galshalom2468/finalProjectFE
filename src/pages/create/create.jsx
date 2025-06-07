import React, { useState, useEffect } from "react";
import styles from "./create.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { supabase } from '../../config/supabase';

function normalizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

const categories = [
  "מתמטיקה", "פיזיקה", "היסטוריה", "ביולוגיה", "פסיכולוגיה", "מדעי המחשב", "כלכלה", "אנגלית", "ספרות", "פילוסופיה", "אמנות"
];

export function CreatePage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [categoryError, setCategoryError] = useState("");
  const [contentError, setContentError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      supabase
        .from('summaries')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (data) {
            setTitle(data.title || "");
            setCategory(data.subject || "");
            setSource(data.source || "");
            setContent(data.content || "");
            setWordCount((data.content || "").split(/\s+/).filter(Boolean).length);
          }
          setLoading(false);
        });
    }
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
  };

  const handleReset = () => {
    setTitle("");
    setCategory("");
    setSource("");
    setContent("");
    setFile(null);
    setWordCount(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!title.trim()) {
      setTitleError("יש להזין כותרת לסיכום");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!category) {
      setCategoryError("יש לבחור קטגוריה");
      hasError = true;
    } else {
      setCategoryError("");
    }

    if (!file && wordCount < 50) {
      setContentError("יש להזין לפחות 50 מילים בסיכום או לצרף קובץ");
      hasError = true;
    } else {
      setContentError("");
    }

    if (hasError) return;

    try {
      let fileUrl = null;
      if (file) {
        const safeFileName = normalizeFileName(file.name);
        const storagePath = `${Date.now()}_${safeFileName}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from('summaries')
          .upload(storagePath, file);
        if (fileError) throw fileError;
        fileUrl = fileData.path;
      }

      if (id) {
        const { error } = await supabase
          .from('summaries')
          .update({
            title,
            subject: category,
            source,
            content,
            ...(fileUrl ? { file_url: fileUrl } : {}),
          })
          .eq('id', id);
        if (error) throw error;
        alert("הסיכום עודכן בהצלחה!");
      } else {
        const { data, error } = await supabase
          .from('summaries')
          .insert([
            {
              title,
              subject: category,
              source,
              content,
              file_url: fileUrl,
              date: new Date().toISOString(),
              rating: 0,
              is_saved: false
            }
          ]);
        if (error) throw error;
        alert("סיכום נוצר בהצלחה!");
        handleReset();
      }
      navigate('/library');
    } catch (error) {
      alert("אירעה שגיאה בשמירה. אנא נסה שוב.");
    }
  };

  return (
    <div className={styles.createPage}>
      <header className={styles.header}>
        <span className={styles.pageTitle}>{id ? "עריכת סיכום" : "יצירת סיכום חדש"}</span>
        <button 
          id="backToLibrary"
          name="backToLibrary"
          className={styles.backButton} 
          onClick={() => navigate("/library")}
        >
          חזרה לספריה
        </button>
      </header>
      <div className={styles.formContainer}>
        {loading ? (
          <div className={styles.loading}>טוען נתונים...</div>
        ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formTitle}>פרטי הסיכום</div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">כותרת הסיכום *</label>
            <input
              id="title"
              name="title"
              className={styles.input}
              type="text"
              placeholder="הזן כותרת ראשית לסיכום ..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            {titleError && <div className={styles.errorMsg}>{titleError}</div>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">קטגוריה *</label>
            <select
              id="category"
              name="category"
              className={styles.input}
              value={category}
              onChange={e => {
                setCategory(e.target.value);
                setCategoryError("");
              }}
            >
              <option value="">בחר קטגוריה ...</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {categoryError && <div className={styles.errorMsg}>{categoryError}</div>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="source">מקור התוכן (אופציונלי)</label>
            <input
              id="source"
              name="source"
              className={styles.input}
              type="text"
              placeholder="ספר, מאמר, קורס וכו' ..."
              value={source}
              onChange={e => setSource(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="content">תוכן הסיכום *</label>
            <textarea
              id="content"
              name="content"
              className={styles.textarea}
              placeholder="כתוב כאן את תוכן הסיכום שלך ..."
              value={content}
              onChange={handleContentChange}
              rows={7}
            />
            <div className={styles.wordCount}>מילים: {wordCount}</div>
            {contentError && <div className={styles.errorMsg}>{contentError}</div>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="file">צרף קובץ (אופציונלי)</label>
            <input
              id="file"
              name="file"
              className={styles.input}
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.formActions}>
            <button className={styles.submitButton} type="submit">
              {id ? "שמור שינויים" : "צור סיכום"}
            </button>
            <button className={styles.resetButton} type="button" onClick={handleReset}>
              איפוס
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
} 