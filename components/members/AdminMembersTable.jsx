import { MembersTable } from "@/components/members/MembersTable";
import React from "react";
import Top from "./Top";
import useStore from "../../store";

export default function AdminMembersTable() {
  const userTeams = useStore((state) => state.userTeams);

  const handleFilter = (team) => {
    alert(team);
  };

  return (
    <main>
      <Top teams={userTeams} onClick={handleFilter} />
      <MembersTable data={[1, 1, 1, 1]} />
    </main>
  );
}
