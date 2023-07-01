import React, { Fragment } from "react";
import styles from "../../styles/nav/DashboardNav.module.scss";
import useStore from "../../store";
import Link from "next/link";

const DashboardNav = ({ accountType }) => {
  const setAccountType = useStore((state) => state.setAccountType);
  const userData = useStore((state) => state.userData);

  // concat user first name and last name from userData and set it to name
  const fullName = `${userData?.first_name} ${userData?.last_name}`;
  const disabled = fullName && userData?.email ? true : false;

  const handleAccountToggle = (event) => {
    const selectedAccountType = event.target.value;
    setAccountType(selectedAccountType);
  };

  return (
    <div className={styles.dashboardNavWrapper}>
      <nav
        className={`dashboardSectionPaddings maxWidthWrapper ${styles.dashboardNav}`}>
        {/* button to slide side menu in and out */}
        <Link href="/" className={styles.logo}>
          KPV
        </Link>
        {userData && (
          <Fragment>
            <h1 className={styles.pageTitle}>{accountType}</h1>/
            <p className={styles.userName}>{fullName}</p>
          </Fragment>
        )}
      </nav>
    </div>
  );
};

export default DashboardNav;
