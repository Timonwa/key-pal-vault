import React, { useEffect, Fragment } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import useStore from "../../store";

const Dashboard = () => {
  const setActivePage = useStore((state) => state.setActivePage);
  const accountType = useStore((state) => state.accountType);
  const setAccountType = useStore((state) => state.setAccountType);

  useEffect(() => {
    setActivePage("Dashboard");
    setAccountType("Super Admin");
  }, [setAccountType, setActivePage]);

  return (
    <Fragment>
      <h1>Dashboard {accountType}</h1>

      {/* {accountType === "Super Admin" && <SuperAdminDashboard />} */}
      {/* {accountType === "Team Head" && <TeamHeadDashboard />} */}
      {/* {accountType === "User" && <MemberDashboard />} */}
    </Fragment>
  );
};

export default Dashboard;

Dashboard.getLayout = function PageLayout(page) {
  const accountType = useStore((state) => state.accountType);
  const activePage = useStore((state) => state.activePage);
  return (
    <DashboardLayout title={accountType} activePage={activePage}>
      {page}
    </DashboardLayout>
  );
};
