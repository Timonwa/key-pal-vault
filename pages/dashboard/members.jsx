import React, { Fragment, useEffect } from "react";
import useStore from "../../store";
import AdminMembersTable from "@/components/members/AdminMembersTable";
import TeamMembersTable from "@/components/members/TeamMembersTable";
import UnauthorizedMessage from "@/components/UnauthorizedMessage";

export default function Members() {
  const accountType = useStore((state) => state.accountType);
  const setActivePage = useStore((state) => state.setActivePage);

  useEffect(() => {
    setActivePage("Members");
  }, [setActivePage]);

  return (
    <Fragment>
      {accountType === "Super Admin" && <AdminMembersTable />}
      {accountType === "Team Lead" && <TeamMembersTable />}
      {accountType === "Member" && <UnauthorizedMessage />}
    </Fragment>
  );
}
