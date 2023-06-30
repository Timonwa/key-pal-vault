import React from "react";
import useStore from "../store";
import styles from "../styles/layout/WithoutAuthLayout.module.scss";
import WithoutAuthNav from "@/components/nav/WithoutAuthNav";

const WithoutAuthLayout = ({ children }) => {
  const accountType = useStore((state) => state.accountType);

  return (
    <div className="wrapper maxWidthWrapper">
      <div className={styles.dashboardLayout}>
        <div className={styles.content}>
          <WithoutAuthNav accountType={accountType} />
          <div className={styles.page}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default WithoutAuthLayout;
