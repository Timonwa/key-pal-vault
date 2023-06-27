import React from "react";
import styles from "../../styles/nav/DashboardSidebar.module.scss";
import Link from "next/link";
import { MdDashboardCustomize, MdOutlineLogout } from "react-icons/md";
import { BiCog } from "react-icons/bi";

const DashboardSideBar = ({ activePage }) => {
  return (
    <nav className={styles.dashboardSidebar}>
      {/* links on desktop screen */}
      <div className={`${styles.bottom} ${styles.large}`}>
        <ul className={styles.navLinks}>
          <li>
            <Link
              href="/dashboard"
              className={`${styles.link} ${
                activePage === "Dashboard" ? styles.active : ""
              }`}>
              <MdDashboardCustomize className={styles.linkIcon} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className={`${styles.link} ${
                activePage === "Settings" ? styles.active : ""
              }`}>
              <BiCog className={styles.linkIcon} />
              Settings
            </Link>
          </li>
          <li className={styles.link} onClick={() => signOut()}>
            <MdOutlineLogout className={styles.linkIcon} />
            Logout
          </li>
        </ul>
      </div>

      {/* links on tablet and mobile screen */}
      <div className={`${styles.bottom} ${styles.small}`}>
        <ul className={styles.navLinks}>
          <li>
            <Link
              href="/dashboard"
              className={`${styles.link} ${
                activePage === "Dashboard" ? styles.active : ""
              }`}>
              <MdDashboardCustomize className={styles.linkIcon} />
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className={`${styles.link} ${
                activePage === "Settings" ? styles.active : ""
              }`}>
              <BiCog className={styles.linkIcon} />
            </Link>
          </li>
          <li className={styles.link} onClick={() => signOut()}>
            <MdOutlineLogout className={styles.linkIcon} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashboardSideBar;
