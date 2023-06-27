import { Fragment } from "react";
import Link from "next/link";

function Home() {
  return (
    <div>
      <h1>Login page</h1>
      <Link href="/dashboard">Login</Link>
    </div>
  );
}

export default Home;

Home.getLayout = function PageLayout(page) {
  return <Fragment>{page}</Fragment>;
};
