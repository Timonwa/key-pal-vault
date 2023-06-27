import React from "react";
import DashboardNav from "../components/nav/DashboardNav";
import DashboardSideBar from "../components/nav/DashboardSideBar";
import styles from "../styles/layout/DashboardLayout.module.scss";

const DashboardLayout = ({ children, activePage, accountType }) => {
  return (
    <div className="wrapper maxWidthWrapper">
      <div className={styles.dashboardLayout}>
        <div className={styles.sidebar}>
          <DashboardSideBar activePage={activePage} accountType={accountType} />
        </div>

        <div className={styles.content}>
          <DashboardNav />
          <div className={styles.page}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
