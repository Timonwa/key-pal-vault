import React from "react";
import styles from "../../styles/nav/DashboardNav.module.scss";
import useStore from "../../store";

const DashboardNav = ({}) => {
  const accountType = useStore((state) => state.accountType);
  return (
    <div className={styles.dashboardNavWrapper}>
      <nav
        className={`dashboardSectionPaddings maxWidthWrapper ${styles.dashboardNav}`}>
        <h1 className={styles.pageTitle}>{accountType}</h1>/
        <p className={styles.userName}>Timonwa Akintokun</p>
      </nav>
    </div>
  );
};

export default DashboardNav;
