import styles from "./styles.module.scss";

export function SectionTitle({ title }) {
  return <h2 className={styles.sectionTitle}>{title}</h2>;
}
