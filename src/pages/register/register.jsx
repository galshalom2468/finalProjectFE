import React from "react";
import styles from "./register.module.css";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן אפשר להוסיף בדיקות/שליחה לשרת
    navigate('/home');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.logoSection}>
        <span className={styles.logoSquare}></span>
        <span className={styles.logoText}>סיכומים</span>
      </div>
      <h1 className={styles.title}>צור חשבון חדש</h1>
      <p className={styles.subtitle}>
        כבר יש לך חשבון?{" "}
        <a href="#" className={styles.link} onClick={() => navigate('/login')}>
          התחבר כאן
        </a>
      </p>
      <form className={styles.loginForm} dir="rtl" onSubmit={handleSubmit}>
        <label className={styles.label}>
          שם מלא
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="הזן את שמך המלא"
              className={styles.input}
            />
            <FaUser className={styles.inputIcon} />
          </div>
        </label>
        <label className={styles.label}>
          דואר אלקטרוני
          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="הזן את כתובת האימייל שלך"
              className={styles.input}
            />
            <FaEnvelope className={styles.inputIcon} />
          </div>
        </label>
        <label className={styles.label}>
          סיסמה
          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              placeholder="בחר סיסמה"
              className={styles.input}
            />
          </div>
        </label>
        <label className={styles.label}>
          אשר סיסמה
          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              placeholder="הזן שוב את הסיסמה"
              className={styles.input}
            />
          </div>
        </label>
        <div className={styles.optionsRow}>
  <label className={styles.checkboxLabel}>
    <input type="checkbox" className={styles.checkbox} required />
    אני מסכים/ה&nbsp;
    <a href="/terms" className={styles.link} target="_blank" rel="noopener noreferrer">
      לתנאי השימוש
    </a>
    &nbsp;ול
    <a href="/privacy" className={styles.link} target="_blank" rel="noopener noreferrer">
      מדיניות הפרטיות
    </a>
  </label>
</div>
        <button type="submit" className={styles.loginButton}>הרשם</button>
        <div className={styles.registerRow}>
          כבר יש לך חשבון?{" "}
          <a href="#" className={styles.link} onClick={() => navigate('/login')}>
            התחבר כאן
          </a>
        </div>
      </form>
    </div>
  );
}