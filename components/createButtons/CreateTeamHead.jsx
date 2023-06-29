import React, { Fragment, useState } from "react";
import styles from "@/styles/createButtons/CreateTeamHead.module.scss";
import Modal from "@/common/Modal";
import { FaPlus } from "react-icons/fa";
import { TeamHeadDetails } from "../members/TeamHeadDetails";

export default function CreateTeamHead() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <TeamHeadDetails onClose={onClose} />
      </Modal>

      <button className={styles.createBtn} onClick={() => openModal()}>
        <FaPlus /> New Team Head
      </button>
    </Fragment>
  );
}
