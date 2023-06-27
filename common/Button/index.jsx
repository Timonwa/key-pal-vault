import React from "react";
import styles from "./styles.module.scss";

export function ButtonSolid({ text, type, styling, onClick }) {
  return (
    <button
      className={styles.button}
      style={styling}
      type={type}
      onClick={onClick}>
      {text}
    </button>
  );
}

export function ButtonPlain({ text, type, styling, onClick }) {
  return (
    <>
      <button
        className={`${styles.button} ${styles.plain}`}
        style={styling}
        type={type}
        onClick={onClick}>
        {text}
      </button>
    </>
  );
}

export function ButtonOutline({ text, type, styling, onClick }) {
  return (
    <>
      <button
        className={`${styles.button} ${styles.outline}`}
        style={styling}
        type={type}
        onClick={onClick}>
        {text}
      </button>
    </>
  );
}
