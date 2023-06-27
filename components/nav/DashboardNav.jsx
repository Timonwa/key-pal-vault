import React from "react";
import styles from "../../styles/nav/DashboardNav.module.scss";
import useStore from "../../store";

const DashboardNav = ({ accountType }) => {
  const setAccountType = useStore((state) => state.setAccountType);

  const handleAccountToggle = (event) => {
    const selectedAccountType = event.target.value;
    setAccountType(selectedAccountType);
  };

  return (
    <div className={styles.dashboardNavWrapper}>
      <nav
        className={`dashboardSectionPaddings maxWidthWrapper ${styles.dashboardNav}`}>
        <h1 className={styles.pageTitle}>{accountType}</h1>/
        <p className={styles.userName}>Timonwa Akintokun</p>
        <select value={accountType} onChange={handleAccountToggle}>
          <option value="Super Admin">Super Admin</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Member">Member</option>
        </select>
      </nav>
    </div>
  );
};

export default DashboardNav;
