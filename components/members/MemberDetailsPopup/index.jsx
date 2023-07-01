import styles from "./styles.module.scss";
import useStore from "../../../store";
import { useState } from "react";
import { baseURL, authHeaders } from "../../../store/axiosDefaults";
import { ButtonLoader } from "@/common/ButtonLoader";
import { ErrorMessage, SuccessMessage } from "@/common/ResponseMessage";

export function MemberDetailsPopup({ onClose, title }) {
  const userTeams = useStore((state) => state.userTeams);
  const allMembers = useStore((state) => state.allMembers);

  const [member, setMember] = useState(allMembers[0].id);
  const [team, setTeam] = useState(userTeams[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const data = {
    user_id: member,
    team_id: team,
  };

  // create a new team
  const createTeam = async () => {
    setIsLoading(true);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const response = await fetch(`${baseURL}/addTeamMember`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 201) {
        setSuccessMessage(result.message);
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
    <section className={styles.editMemberPopup}>
      <h1 className={styles.title}>{title}</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor="team">
            Select Team:
            <select
              id="team"
              name="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}>
              {userTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="member">
            Select Team Member:
            <select
              id="member"
              name="member"
              value={member}
              onChange={(e) => setMember(e.target.value)}>
              {allMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>
          </label>
          <SuccessMessage message={successMessage} />
          <ErrorMessage message={errorMessage} />
        </fieldset>

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.save} type="submit" disabled={isLoading}>
            {!isLoading ? "Add Member" : <ButtonLoader />}
          </button>
        </div>
      </form>
    </section>
  );
}
