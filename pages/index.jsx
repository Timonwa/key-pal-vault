import { Fragment } from "react";
import SignIn from "@/components/SignIn";

function Home() {
  return (
    <div>
      <SignIn />
    </div>
  );
}

export default Home;

Home.getLayout = function PageLayout(page) {
  return <Fragment>{page}</Fragment>;
};
