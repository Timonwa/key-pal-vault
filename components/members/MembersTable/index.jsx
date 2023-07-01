import { Fragment, useState } from "react";
import styles from "./styles.module.scss";
import Modal from "../../../common/Modal";
import { DeletePopup } from "../../../common/DeletePopup";
import { MemberDetailsPopup } from "../MemberDetailsPopup";
import { ErrorMessage } from "@/common/ResponseMessage";

export function MembersTable({ errorMessage, isLoading, teamMembers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const onClose = () => {
    setIsOpen(false);
  };
  const openModal = (type) => {
    setIsOpen(true);
    setModalType(type);
  };

  const handleEdit = (e, data) => {
    e.preventDefault();
    console.log(data);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    alert("deleted");
  };

  return (
    <Fragment>
      {modalType === "edit" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <MemberDetailsPopup
            onClose={onClose}
            handleEdit={handleEdit}
            title="Update Member Details"
          />
        </Modal>
      )}
      {modalType === "delete" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <DeletePopup
            type="Member"
            name="Timonwa Akintokun"
            onClose={onClose}
            handleDelete={handleDelete}
          />
        </Modal>
      )}

      {/* when user has created an event */}
      <section div table className={styles.membersTable}>
        {isLoading ? (
          <p>fetching members...</p>
        ) : errorMessage ? (
          <ErrorMessage message={errorMessage} />
        ) : teamMembers && teamMembers.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <p>Name</p>
                </th>
                <th>
                  <p>Email</p>
                </th>
                {/* <th>
                <p>Status</p>
              </th> */}
                <th>
                  <p>Team</p>
                </th>
                <th>
                  <p>Role</p>
                </th>
                <th>
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((user) => (
                <tr key={user.email}>
                  <td>
                    <p>Timonwa Akintokun</p>
                  </td>
                  <td>
                    <p>timonwaakintokun@gmail.com</p>
                  </td>
                  {/* <td>
                  {user.approved ? (
                    <p className={styles.approved}>approved</p>
                  ) : (
                    <p className={styles.unapproved}>unapproved</p>
                  )}
                </td> */}
                  <td>
                    <p>Development</p>
                  </td>
                  <td>
                    <p>Team Lead</p>
                  </td>
                  <td>
                    <p>
                      <button
                        className={styles.edit}
                        type="button"
                        onClick={() => openModal("edit")}>
                        Edit
                      </button>
                      <button
                        className={styles.delete}
                        type="button"
                        onClick={() => openModal("delete")}>
                        Delete
                      </button>
                    </p>
                  </td>
                </tr>
              ))}{" "}
            </tbody>
          </table>
        ) : (
          <p>No members added yet.</p>
        )}
      </section>
    </Fragment>
  );
}
