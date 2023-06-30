import React, { Fragment, useEffect } from "react";
import Passage from "@passageidentity/passage-node";
import useStore from "../../store";
import AdminMembersTable from "@/components/members/AdminMembersTable";
import TeamMembersTable from "@/components/members/TeamMembersTable";
import UnauthorizedMessage from "@/components/UnauthorizedMessage";

export default function Members({ userInfo, authToken }) {
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
    setActivePage("Members");
    setUserData(userInfo);
  }, [setUserData, userInfo, setActivePage]);

  if (!userData) {
    return null; // Or render a loading state if necessary
  }

  return (
    <Fragment>
      {accountType === "Super Admin" && <AdminMembersTable />}
      {accountType === "Team Lead" && <TeamMembersTable />}
      {accountType === "Member" && <UnauthorizedMessage />}
    </Fragment>
  );
}

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
