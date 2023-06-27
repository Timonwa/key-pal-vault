import Image from "next/image";
import React from "react";
import styles from "../../styles/nav/DashboardNav.module.scss";
import Link from "next/link";

const DashboardNav = ({ title }) => {
  return (
    <div className={styles.dashboardNavWrapper}>
      <nav
        className={`dashboardSectionPaddings maxWidthWrapper ${styles.dashboardNav}`}>
        <div className={styles.logoWrapper}>
          <Link href="/dashboard">
            <Image src="/images/logo.svg" alt="Logo" width="133" height="38" />
          </Link>
        </div>
        <h1 className={styles.pageTitle}>{title}</h1>
      </nav>
    </div>
  );
};

export default DashboardNav;
