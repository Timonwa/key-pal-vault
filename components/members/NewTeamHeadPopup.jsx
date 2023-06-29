import styles from "../../styles/members/NewTeamHeadPopup.module.scss";
import { useState } from "react";

export function NewTeamHeadPopup({ onClose }) {
  const [team, setTeam] = useState("");
  const [teamHead, setTeamHead] = useState("");

  const data = {
    team,
    teamHead,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <section className={styles.newTeamHeadPopup}>
      <h1 className={styles.title}>Create Team Head</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor="team">
            Select Team
            <select
              id="team"
              name="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              required>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>
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
          </label>
        </fieldset>

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
