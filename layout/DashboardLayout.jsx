import React from "react";
import DashboardNav from "../components/nav/DashboardNav";
import DashboardSideBar from "../components/nav/DashboardSideBar";
import useStore from "../store";
import styles from "../styles/layout/DashboardLayout.module.scss";

const DashboardLayout = ({ children }) => {
  const accountType = useStore((state) => state.accountType);
  const activePage = useStore((state) => state.activePage);

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
