import { Filter } from "@/common/Filter";
import { SectionTitle } from "@/common/SectionTitle";
import React from "react";

export default function Top({ teams, onClick, selectedItem, setSelectedItem }) {
  return (
    <nav>
      <SectionTitle title={`${selectedItem?.name} team members`} />
      <Filter
        teams={teams}
        onClick={onClick}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </nav>
  );
}
