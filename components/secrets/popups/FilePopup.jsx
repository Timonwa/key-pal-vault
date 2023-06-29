import { ErrorMessage } from "@/common/ResponseMessage";
import styles from "../../../styles/secrets/PasswordPopup.module.scss";
import { useEffect, useState } from "react";

export function FilePopup({ onClose, handleEdit, title }) {
  const secretNoteData = null;
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [note, setNote] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (secretNoteData) {
      setName(secretNoteData.name);
      setFile(secretNoteData.file);
      setNote(secretNoteData.note);
      setVisibility(secretNoteData.visibility);
      setTeams(secretNoteData.teams);
    }
  }, [secretNoteData]);

  // when user sets visibility to private, clear teams and uncheck all checkboxes
  useEffect(() => {
    if (visibility === "private") {
      setTeams([]);
      const checkboxes = document.querySelectorAll(
        `.${styles.teams} input[type="checkbox"]`
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  }, [visibility]);

  // when user checks a team checkbox, add team to teams array
  useEffect(() => {
    const checkboxes = document.querySelectorAll(
      `.${styles.teams} input[type="checkbox"]`
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          setTeams([...teams, e.target.id]);
        } else {
          setTeams(teams.filter((team) => team !== e.target.id));
        }
      });
    });
  }, [teams]);

  const data = {
    name,
    file,
    note,
    visibility,
    teams,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if visibility is public, teams should not be empty, throw error
    if (visibility === "public" && teams.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    handleEdit(e, data);
  };

  return (
    <section className={styles.passwordPopup}>
      <h1 className={styles.title}>{title}</h1>

      <form onSubmit={(e) => handleSubmit(e, data)}>
        <fieldset>
          <label htmlFor="name">
            Name of secret
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="File name"
              required
            />
          </label>

          <label htmlFor="file">
            Upload file
            <input
              id="file"
              name="file"
              type="file"
              value={file}
              onChange={(e) => setFile(e.target.value)}
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

        <fieldset className={styles.teams}>
          <legend>Select teams:</legend>
          <label htmlFor="marketing">
            <input
              type="checkbox"
              name="team"
              id="marketing"
              disabled={visibility === "private" ? true : false}
            />
            Marketing
          </label>
          <label htmlFor="development">
            <input
              type="checkbox"
              name="team"
              id="development"
              disabled={visibility === "private" ? true : false}
            />
            Development
          </label>
          <label htmlFor="design">
            <input
              type="checkbox"
              name="team"
              id="design"
              disabled={visibility === "private" ? true : false}
            />
            Design
          </label>
        </fieldset>
        {error && <ErrorMessage message="Please select at least one team" />}

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.save} type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
