import React from "react";
import CreateSecret from "./createButtons/CreateSecret";
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
      {accountType === "Admin" && <CreateTeam />}
      {accountType === "Admin" && <CreateSecret />}
    </section>
  );
}
