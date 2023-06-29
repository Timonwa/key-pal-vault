import { Fragment } from "react";
import SignInForm from "@/components/SignInForm";

function Home() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}

export default Home;

Home.getLayout = function PageLayout(page) {
  return <Fragment>{page}</Fragment>;
};
