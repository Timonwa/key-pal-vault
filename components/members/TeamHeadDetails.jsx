import { ErrorMessage, SuccessMessage } from "@/common/ResponseMessage";
import styles from "../../styles/members/TeamHeadDetails.module.scss";
import { useState } from "react";
import { ButtonLoader } from "@/common/ButtonLoader";

export function TeamHeadDetails({ onClose }) {
  const [team, setTeam] = useState("");
  const [teamHead, setTeamHead] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    team,
    teamHead,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <section className={styles.teamHeadDetails}>
      <h1 className={styles.title}>Create New Team</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor="team">
            Select Team
            <input
              id="team"
              name="team"
              type="text"
              placeholder="Marketing division"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              required
            />
            <SuccessMessage message="Team created successfully" />
            <ErrorMessage message="Failed to create Team " />
          </label>
          <label htmlFor="team">
            Select Team Member
            <select
              id="team-head"
              name="team-head"
              value={teamHead}
              onChange={(e) => setTeamHead(e.target.value)}
              required>
              <option value="Timonwa Akintokun">Timonwa Akintokun</option>
              <option value="Sanni Lanre">Sanni Lanre</option>
            </select>
            <SuccessMessage message="Team lead added successfully" />
            <ErrorMessage message="Failed to add Team lead" />
          </label>
        </fieldset>

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.save} type="submit">
            {!isLoading ? " Create Team" : <ButtonLoader />}
          </button>
        </div>
      </form>
    </section>
  );
}
