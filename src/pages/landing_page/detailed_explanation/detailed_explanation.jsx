import React from 'react';
import styles from './detailed_explanation.module.css';

export function Detailed_explanation() {
  return (
    <section className={styles.detailed_explanation}>
      <div className={styles.contentWrapper}>
        <div className={styles.textBlock}>
          <h2 className={styles.detailed_explanation_title}>
            למה לבחור בפלטפורמת <span style={{ color: 'var(--title-blue)' }}>סיכומים</span> שלנו?
          </h2>
          <h3 className={styles.detailed_explanation_subtitle}>
            אנחנו מציעים את הכלים והמשאבים הטובים ביותר כדי לעזור לך להצליח בלימודים
          </h3>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <span className={styles.iconPlaceholder}>📄</span>
              </div>
              <h4 className={styles.featureCardTitle}>תוכן איכותי</h4>
              <p className={styles.featureCardText}>
                סיכומים מקצועיים שנכתבו על ידי מומחים בתחום, מותאמים לרמת הלימוד ומעודכנים באופן שוטף.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <span className={styles.iconPlaceholder}>🔍</span>
              </div>
              <h4 className={styles.featureCardTitle}>חיפוש מתקדם</h4>
              <p className={styles.featureCardText}>
                מנוע חיפוש חכם המאפשר למצוא בקלות את הסיכומים הרלוונטיים ביותר לפי נושא, מילת מפתח או קורס.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <span className={styles.iconPlaceholder}>⭐</span>
              </div>
              <h4 className={styles.featureCardTitle}>דירוג קהילתי</h4>
              <p className={styles.featureCardText}>
                חוכמת ההמונים בפעולה: דרג סיכומים, קרא המלצות של סטודנטים אחרים ומצא את התכנים הפופולריים ביותר.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <span className={styles.iconPlaceholder}>⏱️</span>
              </div>
              <h4 className={styles.featureCardTitle}>חסכון בזמן</h4>
              <p className={styles.featureCardText}>
                הפסק לבזבז זמן על סיכום חומרים. כל מה שאתה צריך, מרוכז, ערוך ומוכן ללמידה יעילה.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <span className={styles.iconPlaceholder}>👤</span>
              </div>
              <h4 className={styles.featureCardTitle}>התאמה אישית</h4>
              <p className={styles.featureCardText}>
                צור רשימות למידה, סמן סיכומים מועדפים ועקוב אחר ההתקדמות האישית שלך בפלטפורמה חכמה ולומדת.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <span className={styles.iconPlaceholder}>✔️</span>
              </div>
              <h4 className={styles.featureCardTitle}>גישה בכל מקום</h4>
              <p className={styles.featureCardText}>
                למד מכל מכשיר ובכל זמן. הפלטפורמה מותאמת למחשב, לטאבלט ולנייד, ללמידה רציפה ונוחה.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}