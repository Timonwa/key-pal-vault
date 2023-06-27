import React from "react";
import styles from "../../styles/nav/DashboardSidebar.module.scss";
import Link from "next/link";
import { MdOutlineDashboardCustomize, MdOutlineLogout } from "react-icons/md";
import { BiCog } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import Image from "next/image";
import useStore from "../../store";

const DashboardSideBar = ({ activePage }) => {
  const accountType = useStore((state) => state.accountType);
  return (
    <nav className={styles.dashboardSidebar}>
      <div className={styles.top}>
        <div className={styles.logoWrapper}>
          <Link href="/dashboard">
            <Image src="/images/logo.svg" alt="Logo" width="50" height="50" />
          </Link>
        </div>
      </div>
      {/* links on desktop screen */}
      <div className={`${styles.bottom} ${styles.large}`}>
        <ul className={styles.navLinks}>
          <li>
            <Link
              href="/dashboard"
              className={`${styles.link} ${
                activePage === "Dashboard" ? styles.active : ""
              }`}>
              <MdOutlineDashboardCustomize className={styles.linkIcon} />{" "}
              Dashboard
            </Link>
          </li>
          {accountType === "Super Admin" || accountType === "Team Head" ? (
            <li>
              <Link
                href="/dashboard/members"
                className={`${styles.link} ${
                  activePage === "Members" ? styles.active : ""
                }`}>
                <FiUsers className={styles.linkIcon} /> Members
              </Link>
            </li>
          ) : null}

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
              <MdOutlineDashboardCustomize className={styles.linkIcon} />
            </Link>
          </li>
          {accountType === "Super Admin" || accountType === "Team Head" ? (
            <li>
              <Link
                href="/dashboard/members"
                className={`${styles.link} ${
                  activePage === "Members" ? styles.active : ""
                }`}>
                <FiUsers className={styles.linkIcon} />
              </Link>
            </li>
          ) : null}

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
