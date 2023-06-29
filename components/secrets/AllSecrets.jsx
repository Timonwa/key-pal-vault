import React from "react";
import styles from "@/styles/secrets/AllSecrets.module.scss";

export function SecretCard() {
  return (
    <article className={styles.secretCard}>
      <h3 className={styles.secretTitle}>Secret Card title</h3>

      <div className={styles.secretButtons}>
        <button className={styles.viewBtn}>View</button>
        <button className={styles.deleteBtn}>Delete</button>
      </div>
    </article>
  );
}
export default function AllSecrets({ data }) {
  return (
    <div className={styles.secretsGrid}>
      {data.map((item) => (
        <SecretCard key={item.id} />
      ))}
    </div>
  );
}
