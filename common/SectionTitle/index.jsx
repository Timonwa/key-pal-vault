import styles from "./styles.module.scss";

export function SectionTitle({ text }) {
  return <h2 className={styles.title}>{text}</h2>;
}
