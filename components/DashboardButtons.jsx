import React from "react";
import CreateSecret from "./createButtons/CreateSecret";
import CreateMember from "./createButtons/CreateMember";
import CreateTeamHead from "./createButtons/CreateTeamHead";
import useStore from "../store";

export default function DashboardButtons() {
  const accountType = useStore((state) => state.accountType);
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "12px",
      }}>
      <CreateSecret />
      <CreateMember />
      {accountType === "Super Admin" && <CreateTeamHead />}
    </section>
  );
}
