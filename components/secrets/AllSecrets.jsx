import React, { Fragment, useState } from "react";
import styles from "@/styles/secrets/AllSecrets.module.scss";
import Modal from "@/common/Modal";
import { DeletePopup } from "@/common/DeletePopup";
import { ViewSecretPopup } from "@/common/ViewSecretPopup";
import {
  MdOutlineEditNote,
  MdOutlineFilePresent,
  MdPassword,
} from "react-icons/md";
import useStore from "../../store";

export function SecretCard({ item }) {
  const accountType = useStore((state) => state.accountType);

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const onClose = () => {
    setIsOpen(false);
  };
  const openModal = (type) => {
    setIsOpen(true);
    setModalType(type);
  };

  const handleView = (e, data) => {
    e.preventDefault();
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
          {item?.type === "password" && (
            <p className={styles.type}>
              <MdPassword />
            </p>
          )}
          {item?.type === "note" && (
            <p className={styles.type}>
              <MdOutlineEditNote />
            </p>
          )}
          {item?.type === "file" && (
            <p className={styles.type}>
              <MdOutlineFilePresent />
            </p>
          )}
        </div>

        {accountType !== "Member" && (
          <div className={styles.secretButtons}>
            <button
              className={styles.viewBtn}
              onClick={() => openModal("view")}>
              View
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => openModal("delete")}>
              Delete
            </button>
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
