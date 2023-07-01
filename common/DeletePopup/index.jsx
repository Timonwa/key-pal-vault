import { ButtonLoader } from "../ButtonLoader";
import { ErrorMessage, SuccessMessage } from "../ResponseMessage";
import styles from "./styles.module.scss";

export function DeletePopup({
  type,
  name,
  onClose,
  handleDelete,
  isLoading,
  errorMessage,
  successMessage,
}) {
  return (
    <div className={styles.deletePopup}>
      <h1 className={styles.title}>You are about to delete</h1>
      <p className={styles.item}>
        {type}: {name}
      </p>

      {errorMessage && <ErrorMessage message={errorMessage} />}
      {successMessage && <SuccessMessage message={successMessage} />}

      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={onClose}>
          Cancel
        </button>
        <button
          className={styles.delete}
          disabled={isLoading}
          onClick={(e) => handleDelete(e)}>
          {isLoading ? <ButtonLoader /> : "Delete"}
        </button>
      </div>
    </div>
  );
}
