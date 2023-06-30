import { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";

export function Filter({ teams, onClick, selectedItem, setSelectedItem }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    if (teams && teams.length > 0) {
      setSelectedItem(teams[0].name);
    }
  }, [setSelectedItem, teams]);

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleSelect = async (team) => {
    await setSelectedItem(team.name);
    setOpenDropdown(false);
    onClick ? onClick(team.name) : null;
  };

  return (
    <div className={styles.filterWrapper}>
      {teams && teams.length !== 0 && (
        <Fragment>
          <p className={styles.filter}>
            <span>Filter:</span>
            <span onClick={handleDropdown} className={styles.selectedItem}>
              {selectedItem}
            </span>
          </p>

          {openDropdown && (
            <div className={styles.itemArray}>
              {teams.map((team) => (
                <span
                  key={team.id}
                  className={styles.item}
                  onClick={() => handleSelect(team)}>
                  {team.name}
                </span>
              ))}
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
}
