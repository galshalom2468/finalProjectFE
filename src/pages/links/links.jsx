import { Link } from "react-router-dom";
import styles from './links.module.css';

export const Links = () => (
  <ul className={styles.nav}>
     <li>
      <Link to="/LandingPage">Landing Page</Link>
    </li>
    <li>
      <Link to="/Home">Home</Link>
    </li>
    <li>
      <Link to="/user">user</Link>
    </li>
    <li>
      <Link to="/help">help</Link>
    </li>
    <li>
      <Link to="/login">login</Link>
    </li>
  </ul>
); 