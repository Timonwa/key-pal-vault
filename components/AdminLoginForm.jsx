import styles from "@/styles/AdminLoginForm.module.scss";
import { useState } from "react";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    email,
    password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <section className={styles.adminLoginForm}>
      <h1 className={styles.title}>Super Admin Portal</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </fieldset>

        <div className={styles.buttons}>
          <button className={styles.save} type="submit">
            Login
          </button>
        </div>
      </form>
    </section>
  );
}
