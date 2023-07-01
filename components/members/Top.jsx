import { Filter } from "@/common/Filter";
import { SectionTitle } from "@/common/SectionTitle";
import React, { useState } from "react";

export default function Top({ teams, onClick }) {
  const [selectedItem, setSelectedItem] = useState(null);
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
