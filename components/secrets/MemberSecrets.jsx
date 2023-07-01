import { SectionTitle } from "@/common/SectionTitle";
import React, { useEffect, useState } from "react";
import AllSecrets from "./AllSecrets";
import useStore from "../../store";
import { Filter } from "@/common/Filter";
import { baseURL, authHeaders } from "../../store/axiosDefaults";

export default function MemberSecrets() {
  const userTeams = useStore((state) => state.userTeams);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [teamSecrets, setTeamSecrets] = useState([]);

  useEffect(() => {
    userTeams && handleFilter(userTeams[0]);
  }, [userTeams]);

  const handleFilter = async (selectedItem) => {
    setIsLoading(true);
    setErrorMessage(false);
    try {
      const response = await fetch(
        `${baseURL}/getTeamVaults?team_id=${selectedItem.id}`,
        {
          method: "GET",
          headers: authHeaders,
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setTeamSecrets(result.data);
        setIsLoading(false);
      } else {
        setErrorMessage(result?.message);
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section>
        <SectionTitle
          title={`${
            selectedItem?.name
              ? `${selectedItem?.name} team secrets`
              : "Join a team"
          } `}
        />
        <Filter
          teams={userTeams}
          onClick={handleFilter}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <AllSecrets
          errorMessage={errorMessage}
          isLoading={isLoading}
          teamSecrets={teamSecrets}
        />
      </section>
    </main>
  );
}
