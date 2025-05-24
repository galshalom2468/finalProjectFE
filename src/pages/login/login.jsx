import React from "react";
import styles from "./login.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.logoSection}>
        <span className={styles.logoSquare}></span>
        <span className={styles.logoText}>סיכומים</span>
      </div>
      <h1 className={styles.title}>התחבר לחשבון שלך</h1>
      <p className={styles.subtitle}>
        או <a href="#" className={styles.link} onClick={() => navigate('/register')}>צור חשבון חדש</a>
      </p>
      <form className={styles.loginForm} dir="rtl" onSubmit={handleSubmit}>
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
              placeholder="הזן את הסיסמה שלך"
              className={styles.input}
            />
          </div>
        </label>
        <div className={styles.optionsRow}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            זכור אותי
          </label>
          <a href="#" className={styles.forgotLink}>שכחת סיסמה?</a>
        </div>
        <button type="submit" className={styles.loginButton}>התחבר</button>
        <div className={styles.registerRow}>
          אין לך חשבון? <a href="#" className={styles.link} onClick={() => navigate('/register')}>הרשם כאן</a>
        </div>
      </form>
    </div>
  );
}