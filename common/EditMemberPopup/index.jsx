import styles from "./styles.module.scss";
import useStore from "../../store";

export function EditMemberPopup({ onClose }) {
  const accountType = useStore((state) => state.accountType);

  return (
    <div className={styles.editMemberPopup}>
      <h1 className={styles.title}>Edit Member Details</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="email"
              type="text"
              value="Timonwa Akintokun"
              disabled
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value="timonwaakintokun@gmail.com"
              disabled
            />
          </label>

          <label htmlFor="status">
            Status
            <select
              id="status"
              name="status"
              value={"unapproved"}
              disabled={accountType === "Super Admin" ? false : true}>
              <option value="approved">approved</option>
              <option value="unapproved">unapproved</option>
            </select>
          </label>

          <label htmlFor="team">
            Team
            <select id="team" name="team" value={"Development"}>
              <option value="Marketing">Marketing</option>
              <option value="Development">Development</option>
              <option value="None">None</option>
            </select>
          </label>

          <label htmlFor="role">
            Role
            <select id="role" name="role" value={"Team Lead"}>
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
