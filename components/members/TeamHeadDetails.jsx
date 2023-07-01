import { ErrorMessage, SuccessMessage } from "@/common/ResponseMessage";
import styles from "../../styles/members/TeamHeadDetails.module.scss";
import { useEffect, useState } from "react";
import { ButtonLoader } from "@/common/ButtonLoader";
import { baseURL, authHeaders } from "../../store/axiosDefaults";
import useStore from "../../store";

export function TeamHeadDetails({ onClose }) {
  const allMembers = useStore((state) => state.allMembers);

  const [teamName, setTeamName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // create a new team
  const createTeam = async () => {
    setIsLoading(true);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const response = await fetch(`${baseURL}/createTeam`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ name: teamName }),
      });
      const result = await response.json();
      if (response.status === 201) {
        setSuccessMessage(result.message);
        setTeamName("");
        window.location.href = "/dashboard/members";
        setIsLoading(false);
      } else {
        setErrorMessage(result.message);
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    }
  };

  // handle creating a team and adding a team head
  const handleSubmit = (e) => {
    e.preventDefault();
    createTeam();
  };

  return (
    <section className={styles.teamHeadDetails}>
      <h1 className={styles.title}>Create New Team</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor="teamName">
            Select Team
            <input
              id="teamName"
              name="teamName"
              type="text"
              placeholder="Marketing division"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </label>
          <SuccessMessage message={successMessage} />
          <ErrorMessage message={errorMessage} />
        </fieldset>

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.save} type="submit" disabled={isLoading}>
            {!isLoading ? "Create Team" : <ButtonLoader />}
          </button>
        </div>
      </form>
    </section>
  );
}
