import React, { useEffect } from "react";
import Passage from "@passageidentity/passage-node";
import useStore from "../../store";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function Profile({ userInfo, authToken }) {
  const setUserData = useStore((state) => state.setUserData);
  const userData = useStore((state) => state.userData);
  const setActivePage = useStore((state) => state.setActivePage);
  const setUserToken = useStore((state) => state.setUserToken);

  useEffect(() => {
    setActivePage("Profile");
    setUserData(userInfo);
    setUserToken(authToken);
  }, [setUserData, userInfo, setActivePage, setUserToken, authToken]);

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-profile");
  }, []);

  if (!userData) {
    return null; // Or render a loading state if necessary
  }

  return (
    <main>
      <ProfileForm />
    </main>
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
