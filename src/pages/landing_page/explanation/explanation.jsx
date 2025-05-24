import React from 'react';
import styles from './explanation.module.css';
import landingImage from '../../../assets/landingPage.png';

export function Explanation() {
  return (
    <section className={`${styles.explanations}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.textBlock}>
          <h1 className={styles.explanation_title}>
            למד חכם יותר עם<br/>
            <span style={{ color: 'var(--title-blue)' }}>סיכומים</span> מעולים
          </h1>
          <p style={{ color: '#5B5B5B', fontSize: '2rem' }}>
            אלפי סיכומים איכותיים… תוכן מקצועי מותאם אישית.
          </p>
          <div className={styles.buttonGroup}>
            <button className="btn btn-blue">התחל ללמוד עכשיו</button>
            <button className="btn btn-white">גלה עוד</button>
          </div>
          <div className={styles.statsContainer}>
            <p className={styles.statItem}>5000+ סיכומים</p>
            <p style={{ color: '#95CAFF' }}>|</p>
            <p className={styles.statItem}>10,000+ תלמידים</p>
            <p style={{ color: '#95CAFF' }}>|</p>
            <p className={styles.statItem}>50+ נושאים</p>
          </div>
        </div>
        <img src={landingImage} alt="תמונה של מסך מחשב" className={styles.image} />
      </div>
    </section>
  );
}
