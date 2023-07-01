import React from "react";
import styles from "@/styles/authPage.module.scss";
import { FaArrowDown } from "react-icons/fa";
import Link from "next/link";

export default function Intro() {
  return (
    <div className={styles.intro}>
      <h1 className={styles.introTitle}>KeyPalVault&apos;s Team</h1>
      <p className={styles.adminText}>For Admin access, log in here</p>
      <FaArrowDown className={styles.icon} />
      <Link className={styles.adminLink} href="/admin-login">
        Admin Login
      </Link>
    </div>
  );
}
