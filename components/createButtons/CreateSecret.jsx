import React, { Fragment, useState } from "react";
import styles from "@/styles/createButtons/CreateSecret.module.scss";
import Modal from "@/common/Modal";
import { PasswordPopup } from "../secrets/popups/PasswordPopup";
import { NotePopup } from "../secrets/popups/NotePopup";
import { FilePopup } from "../secrets/popups/FilePopup";
import { FaPlus } from "react-icons/fa";

export default function CreateSecret() {
  const [selectedSecretType, setSelectedSecretType] = useState("password");

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  // handle secret type change
  const handleSecretTypeChange = (e) => {
    setSelectedSecretType(e.target.id);
    console.log(e.target.id);
  };

  console.log(selectedSecretType);

  const handleCreate = (e, data) => {
    e.preventDefault();
    alert("created");
    console.log(data);
  };

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.options}>
          <p className={styles.optionsTitle}>Secret type:</p>

          <fieldset>
            <label htmlFor="password">
              <input
                type="radio"
                id="password"
                name="secret-type"
                checked={selectedSecretType === "password"}
                onChange={handleSecretTypeChange}
              />
              Password
            </label>
            <label htmlFor="note">
              <input
                type="radio"
                id="note"
                name="secret-type"
                checked={selectedSecretType === "note"}
                onChange={handleSecretTypeChange}
              />
              Note
            </label>
            <label htmlFor="file">
              <input
                type="radio"
                id="file"
                name="secret-type"
                checked={selectedSecretType === "file"}
                onChange={handleSecretTypeChange}
              />
              File
            </label>
          </fieldset>
        </div>

        {selectedSecretType === "password" && (
          <PasswordPopup
            title="Create Secret (Password)"
            onClose={onClose}
            handleEdit={handleCreate}
          />
        )}
        {selectedSecretType === "note" && (
          <NotePopup
            title="Create Secret (Note)"
            onClose={onClose}
            handleEdit={handleCreate}
          />
        )}
        {selectedSecretType === "file" && (
          <FilePopup
            title="Create Secret (File)"
            onClose={onClose}
            handleEdit={handleCreate}
          />
        )}
      </Modal>

      <button className={styles.createBtn} onClick={() => openModal()}>
        <FaPlus /> New Secret
      </button>
    </Fragment>
  );
}
