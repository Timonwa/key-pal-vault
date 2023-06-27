import React from "react";
import styles from "./styles.module.scss";

export default function TabSwitcherLine({ tabs, active, setActive }) {
  const switchTabView = (tab) => {
    setActive(tab);
  };

  return (
    <div className={styles.tabSwitcherWrapper}>
      <ul className={styles.tabSwitcherLine}>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`${styles.tab} ${active === tab ? styles.active : ""}`}
            onClick={() => switchTabView(tab)}>
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
}
