import React from "react";
import styles from "../../styles/nav/DashboardSidebar.module.scss";
import Link from "next/link";
import { MdOutlineDashboardCustomize, MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaChevronRight } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import useStore from "../../store";
import { PassageUser } from "@passageidentity/passage-elements/passage-user";
import { baseURL, authHeaders } from "../../store/axiosDefaults";

const DashboardSideBar = ({ activePage }) => {
  const accountType = useStore((state) => state.accountType);
  const openMenu = useStore((state) => state.openMenu);
  const setOpenMenu = useStore((state) => state.setOpenMenu);
  const isSocialLogin = useStore((state) => state.isSocialLogin);

  const isAdminLogout = async () => {
    console.log("hi");
    try {
      const response = await fetch(`${baseURL}/logout`, {
        method: "POST",
        headers: authHeaders,
      });
      const result = await response.json();
      if (response.status === 200) {
        // remove kpv_auth_token and from local storage,
        // clear persisted data in Zustand store and redirect to home page
        typeof localStorage !== "undefined" &&
          localStorage.removeItem("kpv_auth_token");
        useStore.setState({
          userData: null,
          accountType: null,
          activePage: null,
          openMenu: false,
          isSocialLogin: false,
        });
        window.location.href = "/";
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isSocialLogOut = async () => {
    const user = new PassageUser();
    const signedOut = await user.signOut();
    if (signedOut) {
      // Redirect the user to the home page after successful sign out
      window.location.href = "/";
    }
  };

  const handleSignOut = async () => {
    if (isSocialLogin) {
      isSocialLogOut();
    } else {
      isAdminLogout();
    }
  };

  return (
    <nav
      className={`${styles.dashboardSidebar} ${openMenu ? styles.active : ""}`}>
      <div className={styles.toggle} onClick={() => setOpenMenu(!openMenu)}>
        <FaChevronRight className={styles.icon} />
      </div>
      <div className={styles.top}>
        <div className={styles.logoWrapper}>
          <Link href="/" className={styles.large}>
            KEYPALVAULT
          </Link>
          <p className={styles.small}>KPV</p>
        </div>
      </div>
      {/* links on desktop screen */}
      <div className={`${styles.bottom} ${styles.large}`}>
        <ul className={styles.navLinks}>
          <li onClick={() => setOpenMenu(false)}>
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
            <li onClick={() => setOpenMenu(false)}>
              <Link
                href="/dashboard/members"
                className={`${styles.link} ${
                  activePage === "Members" ? styles.active : ""
                }`}>
                <FiUsers className={styles.linkIcon} /> Members
              </Link>
            </li>
          ) : null}

          <li onClick={() => setOpenMenu(false)}>
            <Link
              href="/dashboard/profile"
              className={`${styles.link} ${
                activePage === "Profile" ? styles.active : ""
              }`}>
              <CgProfile className={styles.linkIcon} />
              Profile
            </Link>
          </li>
          <li className={styles.link} onClick={handleSignOut}>
            <MdOutlineLogout className={styles.linkIcon} />
            Logout
          </li>
        </ul>
      </div>

      {/* links on tablet and mobile screen */}
      <div className={`${styles.bottom} ${styles.small}`}>
        <ul className={styles.navLinks}>
          <li onClick={() => setOpenMenu(false)}>
            <Link
              href="/dashboard"
              className={`${styles.link} ${
                activePage === "Dashboard" ? styles.active : ""
              }`}>
              <MdOutlineDashboardCustomize className={styles.linkIcon} />
            </Link>
          </li>
          {accountType === "Super Admin" || accountType === "Team Lead" ? (
            <li onClick={() => setOpenMenu(false)}>
              <Link
                href="/dashboard/members"
                className={`${styles.link} ${
                  activePage === "Members" ? styles.active : ""
                }`}>
                <FiUsers className={styles.linkIcon} />
              </Link>
            </li>
          ) : null}

          <li onClick={() => setOpenMenu(false)}>
            <Link
              href="/dashboard/profile"
              className={`${styles.link} ${
                activePage === "Profile" ? styles.active : ""
              }`}>
              <CgProfile className={styles.linkIcon} />
            </Link>
          </li>
          <li className={styles.link} onClick={handleSignOut}>
            <MdOutlineLogout className={styles.linkIcon} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashboardSideBar;
