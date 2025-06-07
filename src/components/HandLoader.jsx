import React from "react";
import styles from "./HandLoader.module.css";

export default function HandLoader() {
  return (
    <div className={styles.loading}>
      <div className={styles.finger + ' ' + styles.finger1}>
        <div className={styles.fingerItem}>
          <span></span><i></i>
        </div>
      </div>
      <div className={styles.finger + ' ' + styles.finger2}>
        <div className={styles.fingerItem}>
          <span></span><i></i>
        </div>
      </div>
      <div className={styles.finger + ' ' + styles.finger3}>
        <div className={styles.fingerItem}>
          <span></span><i></i>
        </div>
      </div>
      <div className={styles.finger + ' ' + styles.finger4}>
        <div className={styles.fingerItem}>
          <span></span><i></i>
        </div>
      </div>
      <div className={styles.lastFinger}>
        <div className={styles.lastFingerItem}><i></i></div>
      </div>
    </div>
  );
} 