import React, { Fragment, useState } from "react";
import styles from "@/styles/createButtons/CreateTeamHead.module.scss";
import Modal from "@/common/Modal";
import { PasswordPopup } from "../secrets/popups/PasswordPopup";
import { NotePopup } from "../secrets/popups/NotePopup";
import { FilePopup } from "../secrets/popups/FilePopup";
import { FaPlus } from "react-icons/fa";
import { SectionTitle } from "@/common/SectionTitle";
import { NewTeamHeadPopup } from "../members/NewTeamHeadPopup";

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
        <NewTeamHeadPopup />
      </Modal>

      <button className={styles.createBtn} onClick={() => openModal()}>
        <FaPlus /> New Team Head
      </button>
    </Fragment>
  );
}
