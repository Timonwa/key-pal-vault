import { ErrorMessage, SuccessMessage } from "@/common/ResponseMessage";
import styles from "../../../styles/secrets/PasswordPopup.module.scss";
import { useEffect, useState } from "react";
import useStore from "../../../store";
import { ButtonLoader } from "@/common/ButtonLoader";

export function FilePopup({
  onClose,
  handleEdit,
  title,
  selectedSecretType,
  errorMessage,
  isLoading,
  successMessage,
  clearForm,
  secretNoteData,
}) {
  const userTeams = useStore((state) => state.userTeams);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [note, setNote] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [teams, setTeams] = useState([]);

  // if clear form is true, clear form
  useEffect(() => {
    if (clearForm) {
      setName("");
      setFile("");
      setNote("");
      setVisibility("private");
      setTeams([]);
    }
  }, [clearForm]);

  // if you want to edit secret, set state to secret data
  useEffect(() => {
    if (secretNoteData) {
      setName(secretNoteData?.name);
      setFile(secretNoteData?.file);
      setNote(secretNoteData?.note);
      setVisibility(secretNoteData?.visibility);
      setTeams(secretNoteData?.teams);
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

  // data for request
  const secretData = {
    name,
    type: selectedSecretType,
    content: file,
    note,
    visibility: visibility === "private" ? false : true,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if visibility is public, teams should not be empty, throw error
    if (visibility === "public" && teams.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    handleEdit(e, secretData, teams);
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
              onChange={(e) => {
                const file = e.target.files[0];
                setFile(file);
              }}
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
          {userTeams &&
            userTeams.length !== 0 &&
            userTeams.map((team) => (
              <label key={team.id} htmlFor={team.id}>
                <input
                  type="checkbox"
                  name="team"
                  id={team.id}
                  disabled={visibility === "private" ? true : false}
                />
                {team.name}
              </label>
            ))}
        </fieldset>
        {error && <ErrorMessage message="Please select at least one team" />}
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
