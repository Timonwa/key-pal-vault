import React, { useEffect } from "react";
import DashboardNav from "../components/nav/DashboardNav";
import DashboardSideBar from "../components/nav/DashboardSideBar";
import useStore from "../store";
import styles from "../styles/layout/DashboardLayout.module.scss";
import { baseURL, authHeaders } from "../store/axiosDefaults";

const DashboardLayout = ({ children }) => {
  const accountType = useStore((state) => state.accountType);
  const activePage = useStore((state) => state.activePage);
  const userData = useStore((state) => state.userData);
  const setUserTeams = useStore((state) => state.setUserTeams);
  const setAllMembers = useStore((state) => state.setAllMembers);

  const getUserTeams = async () => {
    try {
      const response = await fetch(
        `${baseURL}/getUserTeams?user_id=${userData.id}`,
        {
          method: "GET",
          headers: authHeaders,
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setUserTeams(result.teams);
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const getAllMembers = async () => {
    try {
      const response = await fetch(
        `${baseURL}/getUsersList?user_id=${userData.id}`,
        {
          method: "GET",
          headers: authHeaders,
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setAllMembers(result.users);
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      getUserTeams();
      getAllMembers();
    }
  }, [userData?.id]);

  return (
    <div className="wrapper maxWidthWrapper">
      <div className={styles.dashboardLayout}>
        <div className={styles.sidebar}>
          <DashboardSideBar accountType={accountType} activePage={activePage} />
        </div>

        <div className={styles.content}>
          <DashboardNav accountType={accountType} />
          <div className={styles.page}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
