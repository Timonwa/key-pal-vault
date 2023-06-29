import { MembersTable } from "@/common/MembersTable";
import React, { useState } from "react";
import Top from "./Top";

export default function AdminMembersTable() {
  const tabs = ["Team Leads", "All Members"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const teamsArray = ["Marketing", "Development", "Design", "Management"];

  return (
    <div>
      <Top
        active={activeTab}
        setActive={setActiveTab}
        tabs={tabs}
        data={teamsArray}
      />
      {activeTab === "Team Leads" && <MembersTable data={[1, 1]} />}
      {activeTab === "All Members" && <MembersTable data={[1, 1, 1, 1]} />}
    </div>
  );
}
