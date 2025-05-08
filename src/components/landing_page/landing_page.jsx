import landingPageStyles from './landing_page.module.css';
import '../../styles/_button.css';
import landingImage from '../../assets/landingPage.png';
import logo from '../../assets/logo.png';
import sectionOneStyles from './section_one.module.css';
import sectionTwoStyles from './section_two.module.css';
import sectionThreeStyles from './section_three.module.css';
import sectionFourStyles from './section_four.module.css';


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


export function LandingPage() {
  return (
    <>
      <nav className={landingPageStyles.secondaryNav} dir="rtl">
        <div className={landingPageStyles.navLogoContainer}>
          <img
            src={logo}
            alt="לוגו סיכומים"
            className={landingPageStyles.navLogo}
          />
          סיכומים
        </div>
        <div className={landingPageStyles.navLinksContainer}>
          <a href="#features" className={landingPageStyles.navLink}>יתרונות</a>
          <a href="#categories" className={landingPageStyles.navLink}>נושאים</a>
          <a href="#testimonials" className={landingPageStyles.navLink}>המלצות</a>
        </div>
        <div className={landingPageStyles.navButtonsContainer}>
          <button className="btn btn-white">התחברות</button>
          <button className="btn btn-blue">הרשמה</button>
        </div>
      </nav>

      <div className={landingPageStyles.landingPageContainer}>
        <section className={`${sectionOneStyles.sectionOne} ${landingPageStyles.section}`}>
          <div className={sectionOneStyles.contentWrapper}>
            <div className={sectionOneStyles.textBlock}>
              <h1 className={sectionOneStyles.sectionOneTitle}>
                למד חכם יותר עם<br />
                <span style={{ color: 'var(--title-blue)' }}>סיכומים</span>
                {' '} מעולים
              </h1>
              <p style={{ color: 'rgb(91, 91, 91)', fontSize: '2rem' }}>
                אלפי סיכומים איכותיים במגוון נושאים ומקצועות. חסוך זמן והצלח במבחנים <br />
                בעזרת תוכן מקצועי מותאם אישית.
              </p>
              <div className={sectionOneStyles.buttonGroup}>
                <button className="btn btn-blue">התחל ללמוד עכשיו</button>
                <button className="btn btn-white">גלה עוד</button>
              </div>
              <div className={sectionOneStyles.statsContainer}>
                <p className={sectionOneStyles.statItem}>5000+ סיכומים</p>
                <p style={{ color: 'rgb(149, 202, 255)' }}>|</p>
                <p className={sectionOneStyles.statItem}>10,000+ תלמידים</p>
                <p style={{ color: 'rgb(149, 202, 255)' }}>|</p>
                <p className={sectionOneStyles.statItem}>50+ נושאים</p>
              </div>
            </div>
            <img
              src={landingImage}
              alt="תמונה של מסך מחשב"
              className={sectionOneStyles.image}
            />
          </div>
        </section>

        <section className={`${sectionTwoStyles.sectionTwo} ${landingPageStyles.section}`}>
          <div className={sectionTwoStyles.contentWrapper}>
            <div className={sectionTwoStyles.textBlock}>
              <h2 className={sectionTwoStyles.sectionTwoTitle}>
                למה לבחור בפלטפורמת
                {' '}
                <span style={{ color: 'var(--title-blue)' }}>סיכומים</span>
                {' '}
                שלנו?
              </h2>
              <h3 className={sectionTwoStyles.sectionTwoSecondTitle}>
                אנחנו מציעים את הכלים והמשאבים הטובים ביותר כדי לעזור לך להצליח בלימודים
              </h3>
              <div className={sectionTwoStyles.featuresGrid}>
                <div className={sectionTwoStyles.featureCard}>
                  <div className={sectionTwoStyles.featureIconContainer}>
                    <span className={sectionTwoStyles.iconPlaceholder}>📄</span>
                  </div>
                  <h4 className={sectionTwoStyles.featureCardTitle}>תוכן איכותי</h4>
                  <p className={sectionTwoStyles.featureCardText}>
                    סיכומים מקצועיים שנכתבו על ידי מומחים בתחום, מותאמים לרמת הלימוד ומעודכנים באופן שוטף.
                  </p>
                </div>
                <div className={sectionTwoStyles.featureCard}>
                  <div className={sectionTwoStyles.featureIconContainer}>
                    <span className={sectionTwoStyles.iconPlaceholder}>🔍</span>
                  </div>
                  <h4 className={sectionTwoStyles.featureCardTitle}>חיפוש מתקדם</h4>
                  <p className={sectionTwoStyles.featureCardText}>
                    מנוע חיפוש חכם המאפשר למצוא בקלות את הסיכומים הרלוונטיים ביותר לפי נושא, מילת מפתח או קורס.
                  </p>
                </div>
                <div className={sectionTwoStyles.featureCard}>
                  <div className={sectionTwoStyles.featureIconContainer}>
                    <span className={sectionTwoStyles.iconPlaceholder}>⭐</span>
                  </div>
                  <h4 className={sectionTwoStyles.featureCardTitle}>דירוג קהילתי</h4>
                  <p className={sectionTwoStyles.featureCardText}>
                    חוכמת ההמונים בפעולה: דרג סיכומים, קרא המלצות של סטודנטים אחרים ומצא את התכנים הפופולריים ביותר.
                  </p>
                </div>
                <div className={sectionTwoStyles.featureCard}>
                  <div className={sectionTwoStyles.featureIconContainer}>
                    <span className={sectionTwoStyles.iconPlaceholder}>⏱️</span>
                  </div>
                  <h4 className={sectionTwoStyles.featureCardTitle}>חסכון בזמן</h4>
                  <p className={sectionTwoStyles.featureCardText}>
                    הפסק לבזבז זמן על סיכום חומרים. כל מה שאתה צריך, מרוכז, ערוך ומוכן ללמידה יעילה.
                  </p>
                </div>
                <div className={sectionTwoStyles.featureCard}>
                  <div className={sectionTwoStyles.featureIconContainer}>
                    <span className={sectionTwoStyles.iconPlaceholder}>👤</span>
                  </div>
                  <h4 className={sectionTwoStyles.featureCardTitle}>התאמה אישית</h4>
                  <p className={sectionTwoStyles.featureCardText}>
                    צור רשימות למידה, סמן סיכומים מועדפים ועקוב אחר ההתקדמות האישית שלך בפלטפורמה חכמה ולומדת.
                  </p>
                </div>
                <div className={sectionTwoStyles.featureCard}>
                  <div className={sectionTwoStyles.featureIconContainer}>
                    <span className={sectionTwoStyles.iconPlaceholder}>✔️</span>
                  </div>
                  <h4 className={sectionTwoStyles.featureCardTitle}>גישה בכל מקום</h4>
                  <p className={sectionTwoStyles.featureCardText}>
                    למד מכל מכשיר ובכל זמן. הפלטפורמה מותאמת למחשב, לטאבלט ולנייד, ללמידה רציפה ונוחה.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className={`${sectionThreeStyles.sectionThree} ${landingPageStyles.section}`}>
          <h2 className={sectionThreeStyles.sectionThreeTitle}>
            גלה סיכומים  <span style={{ color: 'var(--title-blue)' }}>בכל נושא</span>
          </h2>
          <h3 className={sectionThreeStyles.sectionThreeSubtitle}>
            מגוון רחב של סיכומים בנושאים שונים מחכים לך. בחר את התחום שלך והתחל ללמוד
          </h3>
          <div className={sectionThreeStyles.categoriesGrid}>
            <div className={sectionThreeStyles.categoryCard}>
              <div className={sectionThreeStyles.categoryInfo}>
                <span className={sectionThreeStyles.categoryName}>מתמטיקה</span>
                <span className={sectionThreeStyles.categoryCount}>450+ סיכומים</span>
              </div>
              <span className={sectionThreeStyles.categoryIcon}>{'>'}</span>
            </div>
            <div className={sectionThreeStyles.categoryCard} style={{ backgroundColor: '#d1e7ff' }}>
              <div className={sectionThreeStyles.categoryInfo}>
                <span className={sectionThreeStyles.categoryName}>פיזיקה</span>
                <span className={sectionThreeStyles.categoryCount}>320+ סיכומים</span>
              </div>
              <span className={sectionThreeStyles.categoryIcon}>{'>'}</span>
            </div>
            <div className={sectionThreeStyles.categoryCard} style={{ backgroundColor: '#bdddff' }}>
              <div className={sectionThreeStyles.categoryInfo}>
                <span className={sectionThreeStyles.categoryName}>כימיה</span>
                <span className={sectionThreeStyles.categoryCount}>280+ סיכומים</span>
              </div>
              <span className={sectionThreeStyles.categoryIcon}>{'>'}</span>
            </div>
            <div className={sectionThreeStyles.categoryCard}>
              <div className={sectionThreeStyles.categoryInfo}>
                <span className={sectionThreeStyles.categoryName}>ביולוגיה</span>
                <span className={sectionThreeStyles.categoryCount}>350+ סיכומים</span>
              </div>
              <span className={sectionThreeStyles.categoryIcon}>{'>'}</span>
            </div>
            <div className={sectionThreeStyles.categoryCard} style={{ backgroundColor: '#d1e7ff' }}>
              <div className={sectionThreeStyles.categoryInfo}>
                <span className={sectionThreeStyles.categoryName}>היסטוריה</span>
                <span className={sectionThreeStyles.categoryCount}>420+ סיכומים</span>
              </div>
              <span className={sectionThreeStyles.categoryIcon}>{'>'}</span>
            </div>
            <div className={sectionThreeStyles.categoryCard} style={{ backgroundColor: '#bdddff' }}>
              <div className={sectionThreeStyles.categoryInfo}>
                <span className={sectionThreeStyles.categoryName}>ספרות</span>
                <span className={sectionThreeStyles.categoryCount}>310+ סיכומים</span>
              </div>
              <span className={sectionThreeStyles.categoryIcon}>{'>'}</span>
            </div>
            <div className={sectionThreeStyles.categoryCard}>
              <div className={sectionThreeStyles.categoryInfo}>
                <span className={sectionThreeStyles.categoryName}>אנגלית</span>
                <span className={sectionThreeStyles.categoryCount}>380+ סיכומים</span>
              </div>
              <span className={sectionThreeStyles.categoryIcon}>{'>'}</span>
            </div>
            <div className={sectionThreeStyles.categoryCard} style={{ backgroundColor: '#d1e7ff' }}>
              <div className={sectionThreeStyles.categoryInfo}>
                <span className={sectionThreeStyles.categoryName}>מדעי המחשב</span>
                <span className={sectionThreeStyles.categoryCount}>290+ סיכומים</span>
              </div>
              <span className={sectionThreeStyles.categoryIcon}>{'>'}</span>
            </div>
          </div>
          <div className={sectionThreeStyles.buttonContainer}>
            <button className="btn btn-blue">גלה את כל הנושאים</button>
          </div>
        </section>

        <section id="testimonials" className={`${sectionFourStyles.sectionFour} ${landingPageStyles.section}`}>
          <h2 className={sectionFourStyles.sectionFourTitle}>
            מה אומרים עלינו?
          </h2>
          <h3 className={sectionFourStyles.sectionFourSubtitle}>
            אלפי תלמידים וסטודנטים כבר משתמשים בסיכומים שלנו. הנה מה שיש להם להגיד
          </h3>
          <div className={sectionFourStyles.testimonialsGrid}>
            <div className={sectionFourStyles.featureCard}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={sectionFourStyles.testimonialCard}>
                  <img
                    src={testimonial.image}
                    alt={`תמונה של ${testimonial.name}`}
                    className={sectionFourStyles.authorImage}
                  />
                  <div>
                    <p className={sectionFourStyles.authorName}>{testimonial.name}</p>
                    <p className={sectionFourStyles.authorTitle}>{testimonial.title}</p>
                  </div>
                  <div className={sectionFourStyles.ratingStars} aria-label={`דירוג: ${testimonial.rating} מתוך 5`}>
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className={sectionFourStyles.quoteText}>"{testimonial.quote}"</p>
                  <div className={sectionFourStyles.authorInfo}>
                  </div>
                </div>

              ))}
                    </div>

            </div>
        </section>

        <section className={`${landingPageStyles.section} ${landingPageStyles.sectionFive}`}>
          <h2>Section Five</h2>
          <p>Content for the fifth section.</p>
        </section>
      </div>
    </>
  );
}