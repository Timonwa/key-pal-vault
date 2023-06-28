import styles from "../../styles/profile/ProfileForm.module.scss";
import useStore from "../../store";
import { useEffect, useState } from "react";
import { SectionTitle } from "@/common/SectionTitle";

export function ProfileForm() {
  const userData = useStore((state) => state.userData);
  const disabled = userData?.name ? true : false;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userData?.name) {
      setName(userData?.name);
    }
    if (userData?.email) {
      setEmail(userData?.email);
    }
  }, [userData]);

  const data = {
    name: name,
    email: email,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <section className={styles.profileForm}>
      <SectionTitle title={"Your Profile"}></SectionTitle>

      <div>
        {/* status */}
        <p className={styles.status}>
          <span className={styles.statusTitle}>Status:</span>
          {userData?.status ? (
            <span className={styles.approved}>approved</span>
          ) : (
            <span className={styles.unapproved}>unapproved</span>
          )}
        </p>

        {/* teams */}
        <p className={styles.teams}>
          <span className={styles.teamTitle}>Teams:</span>
          <div className={styles.teamsArray}>
            {userData?.teams ? (
              userData?.teams.map((team) => (
                <span key={team} className={styles.team}>
                  {team}
                </span>
              ))
            ) : (
              <span className={styles.team}>none</span>
            )}
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
              disabled={userData?.name ? true : false}
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
