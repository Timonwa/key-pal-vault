import React, { Fragment } from "react";
import styles from "../../styles/nav/DashboardNav.module.scss";
import useStore from "../../store";

const DashboardNav = ({ accountType }) => {
  const setAccountType = useStore((state) => state.setAccountType);
  const userData = useStore((state) => state.userData);

  const handleAccountToggle = (event) => {
    const selectedAccountType = event.target.value;
    setAccountType(selectedAccountType);
  };

  return (
    <div className={styles.dashboardNavWrapper}>
      <nav
        className={`dashboardSectionPaddings maxWidthWrapper ${styles.dashboardNav}`}>
        {/* button to slide side menu in and out */}
        <p className={styles.logo}>KPV</p>
        {userData && (
          <Fragment>
            <h1 className={styles.pageTitle}>{accountType}</h1>/
            <p className={styles.userName}>Timonwa Akintokun</p>
            <select value={accountType} onChange={handleAccountToggle}>
              <option value="Super Admin">Super Admin</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Member">Member</option>
            </select>
          </Fragment>
        )}
      </nav>
    </div>
  );
};

export default DashboardNav;
