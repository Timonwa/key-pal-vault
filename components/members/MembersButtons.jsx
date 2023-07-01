import React from "react";
import CreateTeam from "../createButtons/CreateTeam";
import CreateMember from "../createButtons/CreateMember";
import DeleteButton from "./DeleteButton";

export default function MembersButtons({ selectedItem }) {
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
      <CreateMember />
      <DeleteButton selectedItem={selectedItem} />
    </section>
  );
}
