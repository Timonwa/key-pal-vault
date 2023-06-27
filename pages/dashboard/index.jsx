import React, { useEffect, Fragment } from "react";
import useStore from "../../store";

const Dashboard = () => {
  const setActivePage = useStore((state) => state.setActivePage);
  const accountType = useStore((state) => state.accountType);

  useEffect(() => {
    setActivePage("Dashboard");
  }, [setActivePage]);

  return (
    <Fragment>
      <h1>Dashboard {accountType}</h1>

      {/* {accountType === "Super Admin" && <SuperAdminDashboard />} */}
      {/* {accountType === "Team Lead" && <TeamHeadDashboard />} */}
      {/* {accountType === "User" && <MemberDashboard />} */}
    </Fragment>
  );
};

export default Dashboard;
