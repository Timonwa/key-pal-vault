import { SectionTitle } from "@/common/SectionTitle";
import React, { useState } from "react";
import AllSecrets from "./AllSecrets";
import useStore from "../../store";
import { Filter } from "@/common/Filter";

export default function TeamHeadSecrets() {
  const userTeams = useStore((state) => state.userTeams);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFilter = (team) => {
    alert(team);
  };

  const data = [1, 1, 1];

  return (
    <main>
      <section>
        <SectionTitle title={`${selectedItem} team secrets`} />
        <Filter
          teams={userTeams}
          onClick={handleFilter}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <AllSecrets data={data} />
      </section>
    </main>
  );
}
