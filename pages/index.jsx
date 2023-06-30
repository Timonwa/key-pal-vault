import SignInForm from "@/components/SignInForm";
import WithoutAuthLayout from "@/layout/WithoutAuthLayout";

function Home() {
  return <SignInForm />;
}

export default Home;

Home.getLayout = function PageLayout(page) {
  return <WithoutAuthLayout>{page}</WithoutAuthLayout>;
};
