import { MembersTable } from "@/components/members/MembersTable";
import TabSwitcherLine from "@/common/TabSwitcherLine";
import React, { useState } from "react";

export default function TeamMembersTable() {
  const tabs = ["Team Members"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <TabSwitcherLine
        active={activeTab}
        setActive={setActiveTab}
        tabs={tabs}
      />
      {activeTab === "Team Members" && <MembersTable data={[1, 1, 1]} />}
    </div>
  );
}
