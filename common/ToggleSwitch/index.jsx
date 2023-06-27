import React from "react";
import styles from "./styles.module.scss";

const ToggleSwitch = ({ offLabel, onLabel, status, setStatus, labelStyle }) => {
  return (
    <div div className={styles.toggleSwitch} style={labelStyle}>
      {offLabel}
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={status === onLabel ? true : false}
          onChange={() => {
            if (status === offLabel) {
              setStatus(onLabel);
            } else {
              setStatus(offLabel);
            }
          }}
        />
        <span class={styles.slider}></span>
      </label>
      {onLabel}
    </div>
  );
};

export default ToggleSwitch;
