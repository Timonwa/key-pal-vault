import React from "react";
import styles from "../../styles/nav/WithoutAuthNav.module.scss";
import { MdOutlineLogin } from "react-icons/md";
import Link from "next/link";

const AdminLoginNav = () => {
  return (
    <div className={styles.dashboardNavWrapper}>
      <nav
        className={`dashboardSectionPaddings maxWidthWrapper ${styles.dashboardNav}`}>
        {/* button to slide side menu in and out */}
        <Link href="/" className={styles.logo}>
          KeyPalVault
        </Link>

        {/* admin login */}
        <Link href="/" className={styles.adminBtn}>
          Login
          <MdOutlineLogin />
        </Link>
      </nav>
    </div>
  );
};

export default AdminLoginNav;
