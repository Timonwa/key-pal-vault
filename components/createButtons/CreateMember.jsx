import React, { Fragment, useState } from "react";
import styles from "@/styles/createButtons/CreateTeam.module.scss";
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
          title="Add Team Member"
        />
      </Modal>

      <button className={styles.createBtn} onClick={() => openModal()}>
        <FaPlus /> Add Team Member
      </button>
    </Fragment>
  );
}
