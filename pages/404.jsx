import DashboardNav from "@/components/nav/DashboardNav";
import Link from "next/link";
import React from "react";
import styles from "../styles/layout/DashboardLayout.module.scss";
import useStore from "../store";

export default function FourOhFour() {
  return (
    <div>
      <p>
        Oh oh.! This page does not exist. Please go to{" "}
        <Link style={{ textDecoration: "underline" }} href="/">
          Home
        </Link>
      </p>
    </div>
  );
}

FourOhFour.getLayout = function PageLayout(page) {
  const accountType = useStore((state) => state.accountType);
  return (
    <div className="wrapper maxWidthWrapper">
      <div className={styles.dashboardLayout}>
        <div className={styles.content}>
          <DashboardNav accountType={accountType} />
          <div className={styles.page}>{page}</div>
        </div>
      </div>
    </div>
  );
};
