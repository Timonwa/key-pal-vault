import styles from "./styles.module.scss";

export function DeletePopup({ type, name, onClose, handleDelete }) {
  return (
    <div className={styles.deletePopup}>
      <h1 className={styles.title}>You are about to delete</h1>
      <p className={styles.item}>
        {type}: {name}
      </p>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={onClose}>
          Cancel
        </button>
        <button className={styles.delete} onClick={(e) => handleDelete(e)}>
          Delete
        </button>
      </div>
    </div>
  );
}
