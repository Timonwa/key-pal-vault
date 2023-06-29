import React from "react";
import CreateSecret from "./createButtons/CreateSecret";
import CreateMember from "./createButtons/CreateMember";
import CreateTeamHead from "./createButtons/CreateTeamHead";

export default function DashboardButtons() {
  return (
    <section>
      <CreateSecret />
      <CreateMember />
      <CreateTeamHead />
    </section>
  );
}
