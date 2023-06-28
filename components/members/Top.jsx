import { Filter } from "@/common/Filter";
import TabSwitcherLine from "@/common/TabSwitcherLine";
import React from "react";

export default function Top({ active, setActive, tabs, data }) {
  return (
    <div>
      <TabSwitcherLine active={active} setActive={setActive} tabs={tabs} />
      <Filter data={data} />
    </div>
  );
}
