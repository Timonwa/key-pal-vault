import { Fragment } from "react";
import Script from "next/script";

function Home() {
  return (
    <div>
      <Script src="https://psg.so/web.js"></Script>
      <h1>Login page</h1>
      <passage-auth app-id="inDIuG1aCOAriBoEzE7gFT6Q"></passage-auth>
    </div>
  );
}

export default Home;

Home.getLayout = function PageLayout(page) {
  return <Fragment>{page}</Fragment>;
};
