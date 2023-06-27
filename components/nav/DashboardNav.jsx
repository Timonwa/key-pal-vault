import Image from "next/image";
import React from "react";
import styles from "../../styles/nav/DashboardNav.module.scss";
import Link from "next/link";

const DashboardNav = ({ title }) => {
  return (
    <div className={styles.dashboardNavWrapper}>
      <nav
        className={`dashboardSectionPaddings maxWidthWrapper ${styles.dashboardNav}`}>
        <h1 className={styles.pageTitle}>{title}</h1>/
        <p className={styles.userName}>Timonwa Akintokun</p>
      </nav>
    </div>
  );
};

export default DashboardNav;
