import { SectionTitle } from "@/common/SectionTitle";
import React from "react";
import AllSecrets from "./AllSecrets";

export default function MemberSecrets() {
  const data = ["password", "note", "file", "password", "note", "file"];

  return (
    <main>
      <section>
        <SectionTitle title="All Secrets" />
        <AllSecrets data={data} />
      </section>
    </main>
  );
}
