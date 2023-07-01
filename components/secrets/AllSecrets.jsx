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
import { NotePopup } from "./popups/NotePopup";
import { ErrorMessage } from "@/common/ResponseMessage";
import { EditPasswordPopup } from "./popups/EditPasswordPopup";
import { EditFilePopup } from "./popups/EditFilePopup";
import { baseURL, authHeaders } from "../../store/axiosDefaults";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { EditNotePopup } from "./popups/EditNotePopup";

export function SecretCard({ item, handleFilter, selectedItem }) {
  const accountType = useStore((state) => state.accountType);
  const userTeams = useStore((state) => state.userTeams);
  const [selectedSecretType, setSelectedSecretType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

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
  };

  const handleEdit = async (e, data) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const response = await fetch(`${baseURL}/updateVault`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 200) {
        setSuccessMessage(result.message);
        setIsLoading(false);
        handleFilter(selectedItem);
      } else {
        setErrorMessage(result.message);
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const response = await fetch(
        `${baseURL}/deleteVault?vault_id=${item.id}`,
        {
          method: "DELETE",
          headers: authHeaders,
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setSuccessMessage(result.message);
        setIsLoading(false);
        handleFilter(selectedItem);
      } else {
        setErrorMessage(result.message);
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      {modalType === "view" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ViewSecretPopup
            onClose={onClose}
            handleView={handleView}
            item={item}
            selectedSecretType={selectedSecretType}
          />
        </Modal>
      )}
      {modalType === "edit" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          {selectedSecretType === "password" && (
            <EditPasswordPopup
              secretPasswordData={item}
              title="Update Secret (Password)"
              onClose={onClose}
              handleEdit={handleEdit}
              selectedSecretType={selectedSecretType}
              isLoading={isLoading}
              successMessage={successMessage}
              errorMessage={errorMessage}
            />
          )}
          {selectedSecretType === "note" && (
            <EditNotePopup
              secretPasswordData={item}
              title="Update Secret (Note)"
              onClose={onClose}
              handleEdit={handleEdit}
              selectedSecretType={selectedSecretType}
              isLoading={isLoading}
              successMessage={successMessage}
              errorMessage={errorMessage}
            />
          )}
          {selectedSecretType === "file" && (
            <EditFilePopup
              secretPasswordData={item}
              title="Update Secret (File)"
              onClose={onClose}
              handleEdit={handleEdit}
              selectedSecretType={selectedSecretType}
              isLoading={isLoading}
              successMessage={successMessage}
              errorMessage={errorMessage}
            />
          )}
        </Modal>
      )}
      {modalType === "delete" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <DeletePopup
            type={item.type}
            name={item.name}
            onClose={onClose}
            handleDelete={handleDelete}
            isLoading={isLoading}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        </Modal>
      )}
      <article className={styles.secretCard}>
        <div className={styles.secretTitleWrapper}>
          <h3 className={styles.secretTitle}>{item.name}</h3>

          {item.type === "password" && (
            <p className={styles.type}>
              {item.visibility ? <FaRegEye /> : <FaRegEyeSlash />}
              <MdPassword />
            </p>
          )}
          {item.type === "note" && (
            <p className={styles.type}>
              {item.visibility ? <FaRegEye /> : <FaRegEyeSlash />}
              <MdOutlineEditNote />
            </p>
          )}
          {item.type === "file" && (
            <p className={styles.type}>
              {item.visibility ? <FaRegEye /> : <FaRegEyeSlash />}
              <MdOutlineFilePresent />
            </p>
          )}
        </div>

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
              onClick={() => openModal("view")}>
              View
            </button>
            {accountType === "Admin" && (
              <Fragment>
                {item.type !== "file" && (
                  <button
                    className={styles.editBtn}
                    onClick={(e) => openModal("edit", item.type)}>
                    Edit
                  </button>
                )}
                <button
                  className={styles.deleteBtn}
                  onClick={() => openModal("delete")}>
                  Delete
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </article>
    </Fragment>
  );
}

export default function AllSecrets({
  errorMessage,
  isLoading,
  teamSecrets,
  handleFilter,
  selectedItem,
}) {
  return isLoading ? (
    <p>fetching secrets...</p>
  ) : errorMessage ? (
    <ErrorMessage message={errorMessage} />
  ) : teamSecrets && teamSecrets.length > 0 ? (
    <div className={styles.secretsGrid}>
      {teamSecrets?.map((item) => (
        <SecretCard
          selectedItem={selectedItem}
          handleFilter={handleFilter}
          key={item.id}
          item={item}
        />
      ))}
    </div>
  ) : (
    <p>No secrets yet.</p>
  );
}
