import React, { useEffect, Fragment } from "react";
import useStore from "../../store";
import Passage from "@passageidentity/passage-node";
import SuperAdminSecrets from "@/components/secrets/SuperAdminSecrets";
import TeamHeadSecrets from "@/components/secrets/TeamHeadSecrets";
import MemberSecrets from "@/components/secrets/MemberSecrets";
import DashboardButtons from "@/components/DashboardButtons";

const Dashboard = ({ userInfo, authToken }) => {
  const setUserData = useStore((state) => state.setUserData);
  const userData = useStore((state) => state.userData);
  const accountType = useStore((state) => state.accountType);
  const setActivePage = useStore((state) => state.setActivePage);
  const setUserToken = useStore((state) => state.setUserToken);

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-profile");
  }, []);

  const getToken = () => {
    const psg_auth_token = authToken;
    const kpv_auth_token = localStorage.getItem("kpv_auth_token");
    if (psg_auth_token) {
      setUserToken(psg_auth_token);
    } else if (kpv_auth_token) {
      setUserToken(kpv_auth_token);
    }
    return token;
  };
  useEffect(() => {
    getToken();
  });

  useEffect(() => {
    setActivePage("Dashboard");
    setUserData(userInfo);
  }, [setUserData, userInfo, setActivePage]);

  if (!userData) {
    return null; // Or render a loading state if necessary
  }

  return (
    <Fragment>
      {accountType === "Super Admin" && (
        <Fragment>
          <DashboardButtons />
          <SuperAdminSecrets />
        </Fragment>
      )}
      {accountType === "Team Lead" && (
        <Fragment>
          <DashboardButtons />
          <TeamHeadSecrets />
        </Fragment>
      )}
      {accountType === "Member" && <MemberSecrets />}
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: "HEADER",
  });

  try {
    const authToken = context.req.cookies["psg_auth_token"];
    const req = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      const userInfo = await passage.user.get(userID);
      return {
        props: {
          isAuthorized: true,
          userInfo,
          authToken,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Dashboard;
