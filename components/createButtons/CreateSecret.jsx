import React, { Fragment, useState } from "react";
import styles from "@/styles/createButtons/CreateSecret.module.scss";
import Modal from "@/common/Modal";
import { PasswordPopup } from "../secrets/popups/PasswordPopup";
// import { NotePopup } from "../secrets/popups/NotePopup";
import { FilePopup } from "../secrets/popups/FilePopup";
import { FaPlus } from "react-icons/fa";
import { baseURL, authHeaders } from "../../store/axiosDefaults";

export default function CreateSecret() {
  const [selectedSecretType, setSelectedSecretType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [clearForm, setClearForm] = useState(false);

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

  const addNewSecretToTeam = (id, teams) => {
    teams &&
      teams.length !== 0 &&
      teams.forEach(async (team) => {
        const data = { vault_id: JSON.stringify(id), team_id: team };
        try {
          const response = await fetch(`${baseURL}/addTeam`, {
            method: "POST",
            headers: authHeaders,
            body: JSON.stringify(data),
          });
          const result = await response.json();
          if (result) {
            console.log(result.data);
            setSuccessMessage(result.message);
          }
        } catch (err) {
          setErrorMessage(err.message);
        }
      });
  };

  const createNewSecret = async (data, teams) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/createVault`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 201) {
        addNewSecretToTeam(result.data.id, teams);
        setSuccessMessage(result.message);
        setIsLoading(false);
        setClearForm(true);
      }
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    }
  };

  const handleCreate = (e, data, teams) => {
    e.preventDefault();
    createNewSecret(data, teams);
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
            {/* <label htmlFor="note">
              <input
                type="radio"
                id="note"
                name="secret-type"
                checked={selectedSecretType === "note"}
                onChange={handleSecretTypeChange}
              />
              Note
            </label> */}
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
            isLoading={isLoading}
            errorMessage={errorMessage}
            successMessage={successMessage}
            selectedSecretType={selectedSecretType}
            title="Create Secret (Password)"
            onClose={onClose}
            handleEdit={handleCreate}
            clearForm={clearForm}
          />
        )}
        {/* {selectedSecretType === "note" && (
          <NotePopup
            isLoading={isLoading}
            errorMessage={errorMessage}
            successMessage={successMessage}
            selectedSecretType={selectedSecretType}
            title="Create Secret (Note)"
            onClose={onClose}
            handleEdit={handleCreate}
            clearForm={clearForm}
          />
        )} */}
        {selectedSecretType === "file" && (
          <FilePopup
            isLoading={isLoading}
            errorMessage={errorMessage}
            successMessage={successMessage}
            selectedSecretType={selectedSecretType}
            title="Create Secret (File)"
            onClose={onClose}
            handleEdit={handleCreate}
            clearForm={clearForm}
          />
        )}
      </Modal>

      <button className={styles.createBtn} onClick={() => openModal()}>
        <FaPlus /> New Secret
      </button>
    </Fragment>
  );
}
