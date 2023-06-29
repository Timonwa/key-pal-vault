import { SectionTitle } from "@/common/SectionTitle";
import React from "react";
import AllSecrets from "./AllSecrets";
import { Filter } from "@/common/Filter";

export default function SuperAdminSecrets() {
  const data = ["password", "note", "file", "password", "note", "file"];
  const teamsArray = ["Marketing", "Development", "Design", "Management"];
  return (
    <main>
      <section>
        <SectionTitle title="All Secrets" />
        <Filter data={teamsArray} />
        <AllSecrets data={data} />
      </section>
    </main>
  );
}
