import React from "react";
import styles from "./footer_home.module.css";

export default function FooterHome() {
  return (
<footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <span className={styles.logoSquare}></span>
            <span className={styles.logoText}>סיכומים</span>
          </div>
          <nav className={styles.footerNav}>
            <a href="/terms">תנאי שימוש</a>
            <span className={styles.footerDivider}>|</span>
            <a href="/privacy">פרטיות</a>
            <span className={styles.footerDivider}>|</span>
            <a href="/help">עזרה</a>
          </nav>
        </div>
      </footer>
  );
}