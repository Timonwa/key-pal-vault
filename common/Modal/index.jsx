import React from "react";
import styles from "./styles.module.scss";

export function Modal({ children, onClose, isOpen }) {
  return (
    isOpen && (
      <div className={styles.modal} onClick={onClose}>
        <div className={styles.popUp} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  );
}

export default Modal;
