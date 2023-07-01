import React from "react";
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
      <CreateMember />
      <DeleteButton selectedItem={selectedItem} />
    </section>
  );
}
