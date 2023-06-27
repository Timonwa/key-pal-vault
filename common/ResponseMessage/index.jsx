import React from "react";
import styles from "./styles.module.scss";

export function ErrorMessage({ message }) {
  return <p className={styles.error}>{message}</p>;
}
export function InfoMessage({ message }) {
  return <p className={styles.info}>{message}</p>;
}
export function SuccessMessage({ message }) {
  return <p className={styles.success}>{message}</p>;
}
