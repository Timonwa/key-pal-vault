import React from "react";
import styles from "./styles.module.scss";

export default function TabSwitcherLine({ tabs, active, setActive }) {
  const switchTabView = (tab) => {
    setActive(tab);
  };

  return (
    <div className={styles.tabSwitcherWrapper}>
      <ul className={styles.tabSwitcherLine}>
        {tabs &&
          tabs.length !== 0 &&
          tabs.map((tab) => (
            <li
              key={tab.id}
              className={`${styles.tab} ${
                active === tab.id ? styles.active : ""
              }`}
              onClick={() => switchTabView(tab.id)}>
              {tab.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
