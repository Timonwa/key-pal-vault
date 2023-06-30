import React, { Fragment } from "react";
import styles from "../../styles/nav/WithoutAuthNav.module.scss";
import useStore from "../../store";
import { MdOutlineLogin } from "react-icons/md";
import Link from "next/link";

const WithoutAuthNav = ({ accountType }) => {
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
        <Link href="/" className={styles.logo}>
          KeyPalVault
        </Link>

        {/* super admin login */}
        <Link href="/admin-login" className={styles.adminBtn}>
          Admin Login
          <MdOutlineLogin />
        </Link>
      </nav>
    </div>
  );
};

export default WithoutAuthNav;
