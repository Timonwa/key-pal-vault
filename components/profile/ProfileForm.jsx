import styles from "../../styles/profile/ProfileForm.module.scss";
import useStore from "../../store";
import { useEffect, useState } from "react";
import { SectionTitle } from "@/common/SectionTitle";

export function ProfileForm() {
  const userTeams = useStore((state) => state.userTeams);
  const userData = useStore((state) => state.userData);
  // concat user first name and last name from userData and set it to name
  const fullName = `${userData?.first_name} ${userData?.last_name}`;
  const disabled = fullName && userData?.email ? true : false;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userData?.first_name && userData?.last_name) {
      setName(fullName);
    }
    if (userData?.email) {
      setEmail(userData?.email);
    }
  }, [fullName, userData]);

  // const data = {
  //   name: name,
  //   email: email,
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.profileForm}>
      <SectionTitle title={"Your Profile"}></SectionTitle>

      <div>
        {/* status */}
        {/* <p className={styles.status}>
          <span className={styles.statusTitle}>Status:</span>
          {userData?.status ? (
            <span className={styles.approved}>approved</span>
          ) : (
            <span className={styles.unapproved}>unapproved</span>
          )}
        </p> */}

        {/* teams */}
        <p className={styles.teams}>
          <span className={styles.teamTitle}>Teams:</span>
          <div className={styles.teamsArray}>
            {!userTeams ? (
              <span className={styles.team}>Failed to fetch</span>
            ) : userTeams.length !== 0 ? (
              userTeams.map((team) => (
                <span
                  key={team.id}
                  className={styles.team}
                  onClick={() => handleSelect(team)}>
                  {team.name}
                </span>
              ))
            ) : (
              <span className={styles.team}>none</span>
            )}
            {/* {userTeams && userTeams.length !== 0 ? (
              userTeams.map((team) => (
                <span
                  key={team.id}
                  className={styles.team}
                  onClick={() => handleSelect(team)}>
                  {team.name}
                </span>
              ))
            ) : (
              <span className={styles.team}>none</span>
            )}
            {!userTeams && <span className={styles.team}>Failed to fetch</span>} */}
          </div>
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="email"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={fullName ? true : false}
              required
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
              disabled={userData?.email ? true : false}
              required
            />
          </label>
        </fieldset>

        <div className={styles.buttons}>
          <button disabled={disabled} className={styles.save} type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
