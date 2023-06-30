import { ErrorMessage, SuccessMessage } from "@/common/ResponseMessage";
import styles from "../../styles/members/TeamHeadDetails.module.scss";
import { useEffect, useState } from "react";
import { ButtonLoader } from "@/common/ButtonLoader";
import { baseURL, authHeaders } from "../../store/axiosDefaults";

export function TeamHeadDetails({ onClose }) {
  const members = [
    { id: 3, name: "Timonwa Akintokun" },
    { id: 2, name: "Sanni Lanre" },
  ];

  const [teamName, setTeamName] = useState("");
  const [teamHead, setTeamHead] = useState(members[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [clearForm, setClearForm] = useState(false);

  // if clear form is true, clear form
  useEffect(() => {
    if (clearForm) {
      setTeamHead("");
      setTeamName("");
    }
  }, [clearForm]);

  // after creating a team, add the team head to the team
  const addTeamLead = async (teamId) => {
    const data = {
      team_id: teamId,
      user_id: teamHead,
    };
    try {
      const response = await fetch(`${baseURL}/makeTeamLeader`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 201) {
        setSuccessMessage(result.message);
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

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
        addTeamLead(result.data.id);
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
          <label htmlFor="teamName">
            Select Team Member:{teamHead}
            <select
              id="teamName-head"
              name="teamName-head"
              value={teamHead}
              onChange={(e) => setTeamHead(e.target.value)}>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <SuccessMessage message={successMessage} />
            <ErrorMessage message={errorMessage} />
          </label>
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
