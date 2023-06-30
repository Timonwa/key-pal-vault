import { ErrorMessage, SuccessMessage } from "@/common/ResponseMessage";
import styles from "../../../styles/secrets/PasswordPopup.module.scss";
import { useEffect, useState } from "react";
import { ButtonLoader } from "@/common/ButtonLoader";

export function EditPasswordPopup({
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
  console.log(secretPasswordData);
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
      website,
      username,
      email: "",
      password,
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

          <label htmlFor="website">
            Website
            <input
              id="website"
              name="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://facebook.com"
              required
            />
          </label>

          <label htmlFor="username">
            Username or email
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="companyname@example.com"
              required
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </label>

          <label htmlFor="note">
            Notes (optional)
            <textarea
              id="note"
              name="note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Additional notes"
              maxLength={200}
              rows={3}
            />
          </label>

          <label htmlFor="visibility">
            Visibility
            <select
              id="visibility"
              name="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              required>
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
