import React from 'react';
import styles from "./recommendations.module.css";
import {FaStar, FaRegStar} from "react-icons/fa";

const testimonials = [
  {
    name: "דניאל לוי",
    title: "סטודנט להנדסה",
    quote: "פלטפורמה מעולה עם תוכן איכותי. עזר לי להתמודד עם קורסים מאתגרים ולהבין חומר מורכב בקלות רבה יותר.",
    rating: 4,
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
    name: "יונתן ברוך",
    title: "סטודנט לרפואה",
    quote: "סיכומים שינו את חיי האקדמיים. אני חוסך שעות של עבודה והסיכומים תמיד מדויקים ועדכניים. ממליץ בחום!",
    rating: 3,
    image: "placeholder-avatar-3.png"
  },
  {
    name: "נועה שלום",
    title: "סטודנט לרפואה",
    quote: "סיכומים שינו את חיי האקדמיים. אני חוסך שעות של עבודה והסיכומים תמיד מדויקים ועדכניים. ממליץ בחום!",
    rating: 5,
    image: "placeholder-avatar-4.png"
  }
];

const renderStars = (rating) => {
  return (
    <>
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <FaStar key={i} style={{ color: "#077bff", fontSize: "1.8rem", marginLeft: "0.1em" }} />
        ) : (
          <FaRegStar key={i} style={{ color: "#077bff", fontSize: "1.8rem", marginLeft: "0.1em" }} />
        )
      )}
    </>
  );
};

export function Recommendation() {
  return (
    <section id="testimonials" className={styles.recommendations}>
      <h2 className={styles.recommendations_title}>מה אומרים עלינו?</h2>
      <h3 className={styles.recommendations_subtitle}>
        אלפי תלמידים וסטודנטים כבר משתמשים בסיכומים שלנו. הנה מה שיש להם להגיד
      </h3>
      <div className={styles.testimonialsGrid}>
        {testimonials.slice(0, 4).map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <div className={styles.authorRow}>
              <img
                src={testimonial.image}
                alt={`תמונה של ${testimonial.name}`}
                className={styles.authorImage}
              />
              <div className={styles.authorInfo}>
                <p className={styles.authorName}>{testimonial.name}</p>
                <p className={styles.authorTitle}>{testimonial.title}</p>
              </div>
            </div>
            <div
              className={styles.ratingStars}
              aria-label={`דירוג: ${testimonial.rating} מתוך 5`}
            >
              {renderStars(testimonial.rating)}
            </div>
            <p className={styles.quoteText}>"{testimonial.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}