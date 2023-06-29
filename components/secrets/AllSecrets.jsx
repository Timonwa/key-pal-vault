import React, { Fragment, useState } from "react";
import styles from "@/styles/secrets/AllSecrets.module.scss";
import Modal from "@/common/Modal";
import { DeletePopup } from "@/common/DeletePopup";
import { ViewSecretPopup } from "./popups/ViewSecretPopup";
import {
  MdOutlineEditNote,
  MdOutlineFilePresent,
  MdPassword,
} from "react-icons/md";
import useStore from "../../store";
import { PasswordPopup } from "./popups/PasswordPopup";
import { NotePopup } from "./popups/NotePopup";
import { FilePopup } from "./popups/FilePopup";

export function SecretCard({ item }) {
  const accountType = useStore((state) => state.accountType);
  const [selectedSecretType, setSelectedSecretType] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const onClose = () => {
    setIsOpen(false);
  };
  const openModal = (modalType, secretType) => {
    setIsOpen(true);
    setModalType(modalType);
    setSelectedSecretType(secretType);
  };

  const handleView = (e, data) => {
    e.preventDefault();
    alert("view");
    console.log(data);
  };
  const handleEdit = (e, data) => {
    e.preventDefault();
    alert("edit");
    console.log(data);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    alert("deleted");
  };

  return (
    <Fragment>
      {modalType === "view" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ViewSecretPopup onClose={onClose} handleView={handleView} />
        </Modal>
      )}
      {modalType === "edit" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          {selectedSecretType === "password" && (
            <PasswordPopup
              title="Update Secret (Password)"
              onClose={onClose}
              handleEdit={handleEdit}
            />
          )}
          {selectedSecretType === "note" && (
            <NotePopup
              title="Update Secret (Note)"
              onClose={onClose}
              handleEdit={handleEdit}
            />
          )}
          {selectedSecretType === "file" && (
            <FilePopup
              title="Update Secret (File)"
              onClose={onClose}
              handleEdit={handleEdit}
            />
          )}
        </Modal>
      )}
      {modalType === "delete" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <DeletePopup
            type="Secret"
            name="Secret card title"
            onClose={onClose}
            handleDelete={handleDelete}
          />
        </Modal>
      )}
      <article className={styles.secretCard}>
        <div className={styles.secretTitleWrapper}>
          <h3 className={styles.secretTitle}>Secret Card title</h3>
          {item === "password" && (
            <p className={styles.type}>
              <MdPassword />
            </p>
          )}
          {item === "note" && (
            <p className={styles.type}>
              <MdOutlineEditNote />
            </p>
          )}
          {item === "file" && (
            <p className={styles.type}>
              <MdOutlineFilePresent />
            </p>
          )}
        </div>

        {accountType !== "Member" && (
          <div className={styles.bottom}>
            <div className={styles.metrics}>
              <p>
                <span>Team:</span>
                <span>Marketing</span>
              </p>
              <p>
                <span>Created:</span>
                <span>12/12/2021</span>
              </p>
            </div>
            <div className={styles.secretButtons}>
              <button
                className={styles.viewBtn}
                onClick={() => openModal("view", item)}>
                View
              </button>
              <button
                className={styles.editBtn}
                onClick={() => openModal("edit", item)}>
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => openModal("delete", item)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </article>
    </Fragment>
  );
}

export default function AllSecrets({ data }) {
  return (
    <div className={styles.secretsGrid}>
      {data.map((item) => (
        <SecretCard key={item.id} item={item} />
      ))}
    </div>
  );
}
