import { Fragment } from "react";
import Script from "next/script";

function SignIn() {
  return (
    <div>
      <Script src="https://psg.so/web.js"></Script>
      <passage-auth app-id="inDIuG1aCOAriBoEzE7gFT6Q"></passage-auth>
    </div>
  );
}

export default SignIn;

SignIn.getLayout = function PageLayout(page) {
  return <Fragment>{page}</Fragment>;
};
