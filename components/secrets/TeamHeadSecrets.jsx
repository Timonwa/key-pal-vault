import { SectionTitle } from "@/common/SectionTitle";
import React from "react";
import AllSecrets from "./AllSecrets";

export default function TeamHeadSecrets() {
  const data = [1, 1, 1, 1, 1];

  return (
    <main>
      <SectionTitle title="All Secrets" />
      <AllSecrets data={data} />
    </main>
  );
}
