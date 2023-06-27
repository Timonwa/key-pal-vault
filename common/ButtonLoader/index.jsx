import React from "react";
import styles from "./styles.module.scss";

export function ButtonLoader() {
  return (
    <div className={styles.isLoading}>
      <span>loading</span>
      <span className={styles.loader}></span>
    </div>
  );
}
