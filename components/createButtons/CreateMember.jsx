import React, { Fragment, useState } from "react";
import styles from "@/styles/createButtons/CreateTeamHead.module.scss";
import Modal from "@/common/Modal";
import { FaPlus } from "react-icons/fa";
import { MemberDetailsPopup } from "../members/MemberDetailsPopup";

export default function CreateMember() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const handleCreate = (e, data) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <MemberDetailsPopup
          onClose={onClose}
          handleEdit={handleCreate}
          title="Create New Member"
        />
      </Modal>

      <button className={styles.createBtn} onClick={() => openModal()}>
        <FaPlus /> New Member
      </button>
    </Fragment>
  );
}
