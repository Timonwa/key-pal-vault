import { Fragment, useEffect } from "react";

function SignIn() {
  const appID = process.env.PASSAGE_APP_ID;

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
  }, []);
  return (
    <div>
      <passage-auth app-id={appID}></passage-auth>
    </div>
  );
}
export default SignIn;
SignIn.getLayout = function PageLayout(page) {
  return <Fragment>{page}</Fragment>;
};
