import React from "react";
import DashboardNav from "../components/nav/DashboardNav";
import NavSpace from "../components/nav/NavSpace";
import DashboardSideBar from "../components/nav/DashboardSideBar";
import styles from "../styles/layout/DashboardLayout.module.scss";

const DashboardLayout = ({ children, title, activePage }) => {
  return (
    <div className="wrapper maxWidthWrapper">
      <div className={styles.dashboardLayout}>
        <div className={styles.top}>
          <DashboardNav title={title} />
        </div>

        <div className={styles.bottom}>
          <NavSpace />
          <div className={styles.content}>
            <div className={styles.sidebar}>
              <DashboardSideBar activePage={activePage} />
            </div>

            <div className={styles.page}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
