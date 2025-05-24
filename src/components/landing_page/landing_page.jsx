import React from 'react';
import landingPageStyles from './landing_page.module.css';
import logo from '../../assets/logo.png';
import { Explanation } from './explanation/explanation.jsx';
import { Detailed_explanation } from './detailed_explanation/detailed_explanation.jsx';
import { Topics_variety } from './topics_variety/topics_variety.jsx';
import { Recommendation } from './recommendations/recommendations.jsx';
import { Bottom_bar } from './bottom_bar/bottom_bar.jsx';

export function LandingPage() {
  return (
    <>
      <nav className={landingPageStyles.secondaryNav} dir="rtl">
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
      </nav>

      <div className={landingPageStyles.landingPageContainer}>
        <Explanation />
        <Detailed_explanation />
        <Topics_variety />
        <Recommendation />
        <Bottom_bar />
      </div>
    </>
  );
}