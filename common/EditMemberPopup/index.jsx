import styles from "./styles.module.scss";
import useStore from "../../store";
import { useEffect, useState } from "react";

export function EditMemberPopup({ onClose, handleEdit }) {
  const userData = useStore((state) => state.userData);
  const accountType = useStore((state) => state.accountType);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("unapproved");
  const [team, setTeam] = useState("None");
  const [role, setRole] = useState("Member");

  useEffect(() => {
    if (userData?.name) {
      setName(userData?.name);
    }
    if (userData?.email) {
      setEmail(userData?.email);
    }
    if (userData?.status) {
      setStatus(userData?.status);
    }
    if (userData?.team) {
      setTeam(userData?.team);
    }
    if (userData?.role) {
      setRole(userData?.role);
    }
  }, [userData]);

  const data = {
    name,
    email,
    status,
    team,
    role,
  };

  return (
    <div className={styles.editMemberPopup}>
      <h1 className={styles.title}>Edit Member Details</h1>

      <form onSubmit={(e) => handleEdit(e, data)}>
        <fieldset>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="email"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </label>

          <label htmlFor="status">
            Status
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={accountType === "Super Admin" ? false : true}>
              <option value="approved">approved</option>
              <option value="unapproved">unapproved</option>
            </select>
          </label>

          <label htmlFor="team">
            Team
            <select
              id="team"
              name="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}>
              <option value="Marketing">Marketing</option>
              <option value="Development">Development</option>
              <option value="None">None</option>
            </select>
          </label>

          <label htmlFor="role">
            Role
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value="Team Lead">Team Lead</option>
              <option value="Member">Member</option>
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
    </div>
  );
}
