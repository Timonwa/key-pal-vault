import React from "react";
import CreateSecret from "./createButtons/CreateSecret";
import CreateMember from "./createButtons/CreateMember";
import CreateTeam from "./createButtons/CreateTeam";
import useStore from "../store";

export default function DashboardButtons() {
  const accountType = useStore((state) => state.accountType);
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "16px",
        marginBottom: "16px",
      }}>
      <CreateSecret />
      {accountType === "Super Admin" && <CreateTeam />}
      {/* <CreateMember /> */}
    </section>
  );
}
