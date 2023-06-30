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
import { ErrorMessage } from "@/common/ResponseMessage";

export function SecretCard({ item }) {
  const accountType = useStore((state) => state.accountType);
  const userTeams = useStore((state) => state.userTeams);
  const [selectedSecretType, setSelectedSecretType] = useState("");

  // for each userTeams filter the team_id and return the team name that matches item.name
  const teamName = userTeams
    .filter((team) => team.id === item.pivot.team_id)
    .map((team) => team.name);

  // formate date from 2023-06-30T18:22:02.000000Z to 30/06/2023
  const date = new Date(item.updated_at);
  const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

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

  const handleView = (e) => {
    e.preventDefault();
    console.log(item);
  };
  const handleEdit = (e, item) => {
    e.preventDefault();
    console.log(item);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    alert(item.id);
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
              selectedSecretType={selectedSecretType}
            />
          )}
          {selectedSecretType === "note" && (
            <NotePopup
              title="Update Secret (Note)"
              onClose={onClose}
              handleEdit={handleEdit}
              selectedSecretType={selectedSecretType}
            />
          )}
          {selectedSecretType === "file" && (
            <FilePopup
              title="Update Secret (File)"
              onClose={onClose}
              handleEdit={handleEdit}
              selectedSecretType={selectedSecretType}
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
          <h3 className={styles.secretTitle}>{item.name}</h3>
          {item.type === "password" && (
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
                <span>{teamName}</span>
              </p>
              <p>
                <span>Created:</span>
                <span>{formattedDate}</span>
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

export default function AllSecrets({
  data,
  errorMessage,
  isLoading,
  teamSecrets,
}) {
  return isLoading ? (
    <p>fetching secrets...</p>
  ) : errorMessage ? (
    <ErrorMessage message={errorMessage} />
  ) : teamSecrets && teamSecrets.length > 0 ? (
    <div className={styles.secretsGrid}>
      {teamSecrets.map((item) => (
        <SecretCard key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <p>No secrets created yet.</p>
  );
}
