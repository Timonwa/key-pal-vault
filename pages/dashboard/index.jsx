import React, { useEffect, Fragment } from "react";
import useStore from "../../store";
import Passage from "@passageidentity/passage-node";
import SuperAdminSecrets from "@/components/secrets/SuperAdminSecrets";
import TeamHeadSecrets from "@/components/secrets/TeamHeadSecrets";
import MemberSecrets from "@/components/secrets/MemberSecrets";
import DashboardButtons from "@/components/DashboardButtons";

const Dashboard = ({ isAuthorized, psg_userData, psg_authToken }) => {
  const userData = useStore((state) => state.userData);
  const accountType = useStore((state) => state.accountType);
  const setActivePage = useStore((state) => state.setActivePage);
  const setUserToken = useStore((state) => state.setUserToken);
  const setIsSocialLogin = useStore((state) => state.setIsSocialLogin);

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-profile");
  }, []);

  const getToken = () => {
    const psg_auth_token = psg_authToken;
    const kpv_auth_token = localStorage.getItem("kpv_auth_token");
    let token;
    if (psg_auth_token) {
      token = psg_auth_token;
      setIsSocialLogin(true);
    } else if (kpv_auth_token) {
      token = kpv_auth_token;
      setIsSocialLogin(false);
    }
    return setUserToken(token);
  };
  useEffect(() => {
    getToken();
  });

  const updateUserData = () => {
    // if registered with passage,
    // check if user exists in db by login them in
    // if not, create user in db, then login them in
    const psg_user = psg_userData;
    if (psg_user) {
      console.log(psg_user); //TODO: fix this
    }
  };
  useEffect(() => {
    updateUserData();
  });

  useEffect(() => {
    setActivePage("Dashboard");
  }, [setActivePage]);

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
    // get psg auth token from cookies
    const psg_authToken = context.req.cookies["psg_auth_token"];
    const req = {
      headers: {
        authorization: `Bearer ${psg_authToken}`,
      },
    };
    // authenticate request with passage and get userID
    const userID = await passage.authenticateRequest(req);
    // if userID exists, get user data from passage
    if (userID) {
      const psg_userData = await passage.user.get(userID);
      return {
        props: {
          isAuthorized: true,
          psg_userData,
          psg_authToken,
        },
      };
    } else {
      return {
        props: {
          isAuthorized: false,
          psg_userData: null,
          psg_authToken: null,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        isAuthorized: false,
        psg_userData: null,
        psg_authToken: null,
      },
    };
  }
}

export default Dashboard;
