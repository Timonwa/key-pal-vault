import { MembersTable } from "@/components/members/MembersTable";
import React, { useEffect, useState } from "react";
import Top from "./Top";
import useStore from "../../store";
import { baseURL, authHeaders } from "../../store/axiosDefaults";
import MembersButtons from "./MembersButtons";

export default function AdminMembersTable() {
  const userTeams = useStore((state) => state.userTeams);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    handleFilter(userTeams[0]);
  }, [userTeams]);

  const handleFilter = async (selectedItem) => {
    setIsLoading(true);
    setErrorMessage(false);
    try {
      const response = await fetch(
        `${baseURL}/getTeamMembersWithRoles?team_id=${selectedItem.id}`,
        {
          method: "GET",
          headers: authHeaders,
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setTeamMembers(result.data);
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
      <Top teams={userTeams} onClick={handleFilter} />
      <MembersButtons />
      <MembersTable
        errorMessage={errorMessage}
        isLoading={isLoading}
        teamMembers={teamMembers}
      />
    </main>
  );
}
