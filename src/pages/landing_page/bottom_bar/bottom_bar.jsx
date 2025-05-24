import React from 'react';
import styles from './bottom_bar.module.css';
import { FaYoutube, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';


export function Bottom_bar() {
    return (
    <footer className={styles.bottom_bar} dir="rtl">
      <div className={styles.top}>
        <div className={styles.brand}>
          <h1 className={styles.logo}>
          <span className={styles.logoSquare} />
            סיכומים
          </h1>
          <p className={styles.tagline}>
            הדרך הטובה ביותר ללמוד חכם יותר ולהצליח בלימודים.
          </p>
          <div className={styles.social}>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
          </div>
        </div>

        <div className={styles.column}>
          <h3>נושאים פופולריים</h3>
          <ul>
            <li>מתמטיקה</li>
            <li>אנגלית</li>
            <li>פיזיקה</li>
            <li>היסטוריה</li>
            <li>מדעי המחשב</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>קישורים מהירים</h3>
          <ul>
            <li><a href="#">דף הבית</a></li>
            <li><a href="#">יתרונות</a></li>
            <li><a href="#">נושאים</a></li>
            <li><a href="#">המלצות</a></li>
            <li><a href="#">מחירים</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>צור קשר</h3>
          <ul className={styles.contact}>
            <li><a href="mailto:info@sikoumim.co.il">info@sikoumim.co.il</a></li>
            <li>טל: 03-1234567</li>
            <li>רחוב הרצל 123, תל אביב</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
      <p className={styles.copy}>© 2024 סיכומים. כל הזכויות שמורות.</p>
        <ul className={styles.bottomLinks}>
          <li><a href="#">תנאי שימוש</a></li>
          <li><a href="#">מדיניות פרטיות</a></li>
          <li><a href="#">עזרה ותמיכה</a></li>
        </ul>
     
      </div>
    </footer>
  );
}







