// components/SectionThree.jsx
import React from 'react';
import styles from './topics_variety.module.css';

export function Topics_variety() {
  return (
    <section id="categories" className={styles.topics_variety}>
      <h2 className={styles.topics_variety_title}>
        גלה סיכומים <span style={{ color: 'var(--title-blue)' }}>בכל נושא</span>
      </h2>
      <h3 className={styles.topics_variety_subtitle}>
        מגוון רחב של סיכומים בנושאים שונים מחכים לך. בחר את התחום שלך והתחל ללמוד
      </h3>
      <div className={styles.categoriesGrid}>
        <div className={styles.categoryCard}>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>מתמטיקה</span>
            <span className={styles.categoryCount}>450+ סיכומים</span>
          </div>
          <span className={styles.categoryIcon}>{'>'}</span>
        </div>
        <div className={styles.categoryCard} style={{ backgroundColor: '#d1e7ff' }}>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>פיזיקה</span>
            <span className={styles.categoryCount}>320+ סיכומים</span>
          </div>
          <span className={styles.categoryIcon}>{'>'}</span>
        </div>
        <div className={styles.categoryCard} style={{ backgroundColor: '#bdddff' }}>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>כימיה</span>
            <span className={styles.categoryCount}>280+ סיכומים</span>
          </div>
          <span className={styles.categoryIcon}>{'>'}</span>
        </div>
        <div className={styles.categoryCard}>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>ביולוגיה</span>
            <span className={styles.categoryCount}>350+ סיכומים</span>
          </div>
          <span className={styles.categoryIcon}>{'>'}</span>
        </div>
        <div className={styles.categoryCard} style={{ backgroundColor: '#d1e7ff' }}>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>היסטוריה</span>
            <span className={styles.categoryCount}>420+ סיכומים</span>
          </div>
          <span className={styles.categoryIcon}>{'>'}</span>
        </div>
        <div className={styles.categoryCard} style={{ backgroundColor: '#bdddff' }}>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>ספרות</span>
            <span className={styles.categoryCount}>310+ סיכומים</span>
          </div>
          <span className={styles.categoryIcon}>{'>'}</span>
        </div>
        <div className={styles.categoryCard}>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>אנגלית</span>
            <span className={styles.categoryCount}>380+ סיכומים</span>
          </div>
          <span className={styles.categoryIcon}>{'>'}</span>
        </div>
        <div className={styles.categoryCard} style={{ backgroundColor: '#d1e7ff' }}>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>מדעי המחשב</span>
            <span className={styles.categoryCount}>290+ סיכומים</span>
          </div>
          <span className={styles.categoryIcon}>{'>'}</span>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className="btn btn-blue">גלה את כל הנושאים</button>
      </div>
    </section>
  );
}
