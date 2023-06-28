import React from "react";
import styles from "../../styles/nav/DashboardSidebar.module.scss";
import Link from "next/link";
import { MdOutlineDashboardCustomize, MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaChevronRight } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import useStore from "../../store";

const DashboardSideBar = ({ activePage }) => {
  const accountType = useStore((state) => state.accountType);
  const openMenu = useStore((state) => state.openMenu);
  const setOpenMenu = useStore((state) => state.setOpenMenu);
  console.log(openMenu);

  return (
    <nav
      className={`${styles.dashboardSidebar} ${openMenu ? styles.active : ""}`}>
      <div className={styles.toggle} onClick={() => setOpenMenu(!openMenu)}>
        <FaChevronRight className={styles.icon} />
      </div>
      <div className={styles.top}>
        <div className={styles.logoWrapper}>
          <p className={styles.large}>KEYPALVAULT</p>
          <p className={styles.small}>KPV</p>
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
          {accountType === "Super Admin" || accountType === "Team Lead" ? (
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
              href="/dashboard/profile"
              className={`${styles.link} ${
                activePage === "Profile" ? styles.active : ""
              }`}>
              <CgProfile className={styles.linkIcon} />
              Profile
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
          {accountType === "Super Admin" || accountType === "Team Lead" ? (
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
              href="/dashboard/profile"
              className={`${styles.link} ${
                activePage === "Profile" ? styles.active : ""
              }`}>
              <CgProfile className={styles.linkIcon} />
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
