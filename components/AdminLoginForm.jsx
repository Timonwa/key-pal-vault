import styles from "@/styles/AdminLoginForm.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { baseURL, defaultHeaders } from "../store/axiosDefaults";
import useStore from "../store";

export default function AdminLoginForm() {
  const router = useRouter();
  const userData = useStore((state) => state.userData);
  const accountType = useStore((state) => state.accountType);
  const userToken = useStore((state) => state.userToken);

  const setUserData = useStore((state) => state.setUserData);
  const setAccountType = useStore((state) => state.setAccountType);
  const setUserToken = useStore((state) => state.setUserToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    email,
    password,
    remember: false,
  };

  const handleAccountType = async (role) => {
    if (role === 1) {
      await setAccountType("Super Admin");
    }
    if (role === 2) {
      await setAccountType("Member");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // uses axios to login, if login is successful, redirect to "/dashboard"
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 200) {
        localStorage.setItem("kpv_auth_token", result.token);
        await setUserToken(result.token);
        handleAccountType(result.user.user_role_id);
        await setUserData(result.user);
        router.push("/dashboard");
        console.log(result);
      }
      else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(userData, accountType, userToken);

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
