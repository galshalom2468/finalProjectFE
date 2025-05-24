import React from 'react';
import styles from "./recommendations.module.css";

const testimonials = [
  {
    name: "ינון ברוך",
    title: "סטודנט להנדסה",
    quote: "פלטפורמה מעולה עם תוכן איכותי. עזר לי להתמודד עם קורסים מאתגרים ולהבין חומר מורכב בקלות רבה יותר.",
    rating: 5,
    image: "placeholder-avatar-1.png"
  },
  {
    name: "מיכל כהן",
    title: "תלמידת תיכון",
    quote: "בזכות סיכומים הצלחתי לשפר את הציונים שלי משמעותית. החומר תמיד מעודכן, ערוך בצורה נהדרת וקל להבנה.",
    rating: 5,
    image: "placeholder-avatar-2.png"
  },
  {
    name: "דניאל לוי",
    title: "סטודנט לרפואה",
    quote: "סיכומים שינו את חיי האקדמיים. אני חוסך שעות של עבודה והסיכומים תמיד מדויקים ועדכניים. ממליץ בחום!",
    rating: 5,
    image: "placeholder-avatar-3.png"
  },
  {
    name: "דניאל לוי",
    title: "סטודנט לרפואה",
    quote: "סיכומים שינו את חיי האקדמיים. אני חוסך שעות של עבודה והסיכומים תמיד מדויקים ועדכניים. ממליץ בחום!",
    rating: 5,
    image: "placeholder-avatar-4.png"
  }
];

const renderStars = (rating) => {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += (i < rating) ? '★' : '☆';
  }
  return stars;
};

export function Recommendation() {
  return (
    <section id="testimonials" className={styles.recommendations}>
      <h2 className={styles.sectionFourTitle}>מה אומרים עלינו?</h2>
      <h3 className={styles.sectionFourSubtitle}>
        אלפי תלמידים וסטודנטים כבר משתמשים בסיכומים שלנו. הנה מה שיש להם להגיד
      </h3>
      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <img
              src={testimonial.image}
              alt={`תמונה של ${testimonial.name}`}
              className={styles.authorImage}
            />
            <div>
              <p className={styles.authorName}>{testimonial.name}</p>
              <p className={styles.authorTitle}>{testimonial.title}</p>
            </div>
            <div
              className={styles.ratingStars}
              aria-label={`דירוג: ${testimonial.rating} מתוך 5`}
            >
              {renderStars(testimonial.rating)}
            </div>
            <p className={styles.quoteText}>"{testimonial.quote}"</p>
            <div className={styles.authorInfo}></div>
          </div>
        ))}
      </div>
    </section>
  );
}

