import { SectionTitle } from "@/common/SectionTitle";
import React from "react";
import AllSecrets from "./AllSecrets";
import { Filter } from "@/common/Filter";

export default function SuperAdminSecrets() {
  const data = [1, 1, 1, 1, 1];
  const teamsArray = ["Marketing", "Development", "Design", "Management"];
  return (
    <main>
      <SectionTitle title="All Secrets" />
      <Filter data={teamsArray} />
      <AllSecrets data={data} />
    </main>
  );
}