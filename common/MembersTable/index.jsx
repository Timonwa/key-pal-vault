import styles from "./styles.module.scss";

export function MembersTable({ data }) {
  return (
    <>
      {/* when user has not created an event yet */}
      {/* <div div table className={styles.membersTable}>
        <div className={`${styles.top} ${styles.message}`}>
          <h2 className={styles.heading}>Team leads</h2>
          <div className={styles.description}>
            <p>No leads yet.</p>
            <p>No members yet.</p>
          </div>
        </div>
      </div> */}

      {/* when user has created an event */}
      <div div table className={styles.membersTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <p>Name</p>
              </th>
              <th>
                <p>Email</p>
              </th>
              <th>
                <p>Approve</p>
              </th>
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
            {data.map((user) => (
              <tr key={user.email}>
                <td>
                  <p>Timonwa Akintokun</p>
                </td>
                <td>
                  <p>timonwaakintokun@gmail.com</p>
                </td>
                <td>
                  {user.approved ? (
                    <p className={styles.approved}>approved</p>
                  ) : (
                    <p className={styles.unapproved}>unapproved</p>
                  )}
                </td>
                <td>
                  <p>Development</p>
                </td>
                <td>
                  <p>Team lead</p>
                </td>
                <td>
                  <p>
                    <button className={styles.edit}>Edit</button>
                    <button className={styles.delete}>Delete</button>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
