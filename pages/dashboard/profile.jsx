import React, { useEffect, useState } from "react";
import Passage from "@passageidentity/passage-node";
import useStore from "../../store";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function Profile({ isAuthorized, psg_userData, psg_authToken }) {
  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);
  const accountType = useStore((state) => state.accountType);
  const setActivePage = useStore((state) => state.setActivePage);
  const setUserToken = useStore((state) => state.setUserToken);
  const setAccountType = useStore((state) => state.setAccountType);
  const setIsSocialLogin = useStore((state) => state.setIsSocialLogin);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-profile");
  }, []);

  const getToken = () => {
    const psg_auth_token = psg_authToken;
    const kpv_auth_token = localStorage.getItem("kpv_auth_token");
    let token;
    token = kpv_auth_token;
    if (psg_auth_token) {
      setIsSocialLogin(true);
    }
    return setUserToken(token);
  };
  useEffect(() => {
    getToken();
  }, []);

  const handleAccountType = async (role) => {
    if (role === 1) {
      await setAccountType("Admin");
    }
  };

  const updateUserData = async () => {
    // if registered with passage,
    // check if user exists in db by login them in
    // if not, create user in db, then login them in
    const psg_user = psg_userData;
    setIsLoading(true);
    setErrorMessage(null);
    if (psg_user) {
      const data = {
        first_name: psg_user.user_metadata.first_name,
        last_name: psg_user.user_metadata.last_name,
        email: psg_user.email,
        role: 2,
        social_type: "passage",
      };
      try {
        const response = await fetch(`${baseURL}/socialAuth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${psg_authToken}`,
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.status === 200) {
          localStorage.setItem("kpv_auth_token", result.token);
          await setUserToken(result.token);
          handleAccountType(result.user.user_role_id);
          await setUserData(result.user);
          setIsLoading(false);
          setErrorMessage(null);
        } else {
          setErrorMessage(result.error);
          setIsLoading(false);
        }
      } catch (err) {
        setErrorMessage(err.message);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    updateUserData();
  }, []);

  useEffect(() => {
    setActivePage("Profile");
  }, [setActivePage]);

  if (!userData) {
    return (
      <div>
        {isLoading && <p>loading...</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
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
