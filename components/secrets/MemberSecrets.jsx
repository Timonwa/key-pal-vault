import { SectionTitle } from "@/common/SectionTitle";
import React from "react";
import AllSecrets from "./AllSecrets";

export default function MemberSecrets() {
  const data = [1, 1, 1, 1, 1];

  return (
    <main>
      <section>
        <SectionTitle title="All Secrets" />
        <AllSecrets data={data} />
      </section>
    </main>
  );
}
