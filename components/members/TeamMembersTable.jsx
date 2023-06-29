import { MembersTable } from "@/components/members/MembersTable";
import React, { useState } from "react";
import Top from "./Top";

export default function TeamMembersTable() {
  const tabs = ["Team Members"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const teamsArray = [
    "All",
    "Marketing",
    "Development",
    "Design",
    "Management",
  ];

  return (
    <main>
      <Top
        active={activeTab}
        setActive={setActiveTab}
        tabs={tabs}
        data={teamsArray}
      />
      {activeTab === "Team Members" && <MembersTable data={[1, 1, 1]} />}
    </main>
  );
}
