import { Fragment, useState } from "react";
import styles from "./styles.module.scss";
import useStore from "../../store";

export function Filter({ data }) {
  const userTeams = useStore((state) => state.userTeams);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(userTeams[0]);

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setOpenDropdown(false);
  };

  return (
    <div className={styles.filterWrapper}>
      {userTeams && userTeams.length < 0 && (
        <Fragment>
          <p className={styles.filter}>
            <span>Filter:</span>
            <span onClick={handleDropdown} className={styles.selectedItem}>
              {selectedItem}
            </span>
          </p>

          {openDropdown && (
            <div className={styles.itemArray}>
              {userTeams.map((item, index) => (
                <span
                  key={index}
                  className={styles.item}
                  onClick={() => handleSelect(item)}>
                  {item}
                </span>
              ))}
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
}
