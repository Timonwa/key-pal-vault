import { MembersTable } from "@/common/MembersTable";
import TabSwitcherLine from "@/common/TabSwitcherLine";
import React, { useState } from "react";

export default function AdminMembersTable() {
  const tabs = ["Team Leads", "All Members"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <TabSwitcherLine
        active={activeTab}
        setActive={setActiveTab}
        tabs={tabs}
      />
      {activeTab === "Team Leads" && <MembersTable data={[1, 1]} />}
      {activeTab === "All Members" && <MembersTable data={[1, 1, 1, 1]} />}
    </div>
  );
}
