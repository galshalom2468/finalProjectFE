import React from 'react';
import { useNavigate } from "react-router-dom";
import landingPageStyles from './landing_page.module.css';
import logo from '../../assets/logo.png';
import { Explanation } from './explanation/explanation.jsx';
import { Detailed_explanation } from './detailed_explanation/detailed_explanation.jsx';
import { Topics_variety } from './topics_variety/topics_variety.jsx';
import { Recommendation } from './recommendations/recommendations.jsx';
import { Bottom_bar } from './bottom_bar/bottom_bar.jsx'; 


export function LandingPage() {
  const navigate = useNavigate();
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
          <a href="#detailed_explanation" className={landingPageStyles.navLink}>יתרונות</a>
          <a href="#topics_variety" className={landingPageStyles.navLink}>נושאים</a>
          <a href="#recommendations" className={landingPageStyles.navLink}>המלצות</a>
        </div>
        <div className={landingPageStyles.navButtonsContainer}>
          <button className="btn btn-white" onClick={() => navigate('/login')}>התחברות</button>
          <button className="btn btn-blue" onClick={() => navigate('/register')}>הרשמה</button>
        </div>
      </nav>
      

      <div className={landingPageStyles.landingPageContainer}>
  <Explanation />
  <section id="detailed_explanation">
    <Detailed_explanation />
  </section>
  <section id="topics_variety">
    <Topics_variety />
  </section>
  <section id="recommendations">
    <Recommendation />
  </section>
</div>
      <Bottom_bar />
    </>
  );
}