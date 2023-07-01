import { ErrorMessage, SuccessMessage } from "@/common/ResponseMessage";
import styles from "../../../styles/secrets/PasswordPopup.module.scss";
import { useEffect, useState } from "react";
import { ButtonLoader } from "@/common/ButtonLoader";

export function EditNotePopup({
  onClose,
  handleEdit,
  title,
  selectedSecretType,
  errorMessage,
  isLoading,
  successMessage,
  clearForm,
  secretPasswordData,
}) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [visibility, setVisibility] = useState("private");

  // if clear form is true, clear form
  useEffect(() => {
    if (clearForm) {
      setName("");
      setWebsite("");
      setUsername("");
      setPassword("");
      setNote("");
      setVisibility("private");
    }
  }, [clearForm]);

  // if you want to edit secret, set state to secret data
  useEffect(() => {
    if (secretPasswordData) {
      setName(secretPasswordData?.name);
      setWebsite(secretPasswordData?.content?.website);
      setUsername(secretPasswordData?.content?.username);
      setPassword(secretPasswordData?.content?.password);
      setNote(secretPasswordData?.note);
      setVisibility(
        secretPasswordData?.visibility === 1 ? "public" : "private"
      );
    }
  }, [secretPasswordData]);

  // data for request
  const secretData = {
    vault_id: secretPasswordData.id,
    name: name,
    type: secretPasswordData.type,
    content: {
      website: "",
      username: "",
      email: "",
      password: "",
    },
    note,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(e, secretData);
  };

  return (
    <section className={styles.passwordPopup}>
      <h1 className={styles.title}>{title}</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor="name">
            Name of secret
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Facebook login details"
              required
            />
          </label>

          <label htmlFor="note">
            Notes
            <textarea
              id="note"
              name="note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter notes"
              rows={3}
              required
            />
          </label>

          <label htmlFor="visibility">
            Visibility
            <select
              id="visibility"
              name="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              required
              disabled>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </label>
        </fieldset>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {successMessage && <SuccessMessage message={successMessage} />}

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.save} type="submit" disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
