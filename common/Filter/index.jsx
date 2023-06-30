import { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import useStore from "../../store";

export function Filter() {
  const userTeams = useStore((state) => state.userTeams);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (userTeams && userTeams.length > 0) {
      setSelectedItem(userTeams[0].name);
    }
  }, [userTeams]);

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleSelect = (team) => {
    setSelectedItem(team.name);
    setOpenDropdown(false);
  };

  return (
    <div className={styles.filterWrapper}>
      {userTeams && userTeams.length !== 0 && (
        <Fragment>
          <p className={styles.filter}>
            <span>Filter:</span>
            <span onClick={handleDropdown} className={styles.selectedItem}>
              {selectedItem}
            </span>
          </p>

          {openDropdown && (
            <div className={styles.itemArray}>
              {userTeams.map((team) => (
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
