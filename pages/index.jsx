import { Fragment, useEffect } from "react";
import SignInForm from "@/components/SignInForm";
import { useRouter } from "next/router";
import useStore from "../store";

function Home() {
  const user = useStore((state) => state.userData);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  });
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
