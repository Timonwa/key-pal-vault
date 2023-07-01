import { DeletePopup } from "@/common/DeletePopup";
import Modal from "@/common/Modal";
import React, { useState } from "react";
import { baseURL, authHeaders } from "../../store/axiosDefaults";
import styles from "@/styles/members/DeleteTeam.module.scss";

export default function DeleteButton({ selectedItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const response = await fetch(
        `${baseURL}/deleteTeam?team_id=${selectedItem.id}`,
        {
          method: "GET",
          headers: authHeaders,
        }
      );
      const result = await response.json();
      if (response.status === 201) {
        setSuccessMessage(result.message);
        setIsLoading(false);
        window.location.href = "/dashboard/members";
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
    <div>
      <button onClick={openModal} className={styles.deleteBtn}>
        Delete Team
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <DeletePopup
          type="Team"
          name={selectedItem?.name}
          onClose={onClose}
          handleDelete={handleDelete}
          isLoading={isLoading}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      </Modal>
    </div>
  );
}
