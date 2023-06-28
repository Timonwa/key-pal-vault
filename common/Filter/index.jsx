import { useState } from "react";
import styles from "./styles.module.scss";

export function Filter({ data }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(data[0]);

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setOpenDropdown(false);
  };

  return (
    <div className={styles.filterWrapper}>
      <p className={styles.filter}>
        <span>Filter:</span>
        <span onClick={handleDropdown} className={styles.selectedItem}>
          {selectedItem}
        </span>
      </p>

      {openDropdown && (
        <div className={styles.itemArray}>
          {data.map((item, index) => (
            <span
              key={index}
              className={styles.item}
              onClick={() => handleSelect(item)}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
