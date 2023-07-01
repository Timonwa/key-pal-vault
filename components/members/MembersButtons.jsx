import React from "react";
import CreateTeam from "../createButtons/CreateTeam";
import CreateMember from "../createButtons/CreateMember";

export default function MembersButtons() {
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "16px",
        marginBottom: "16px",
      }}>
      <CreateTeam />
    </section>
  );
}
