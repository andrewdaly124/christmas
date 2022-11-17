import React from "react";

import styles from "./index.module.scss";

export default function HomeButton({ text, onClick }) {
  return (
    <button type="button" className={styles.homeButton} onClick={onClick}>
      {text}
    </button>
  );
}
