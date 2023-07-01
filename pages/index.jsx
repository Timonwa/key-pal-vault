import Intro from "@/components/Intro";
import SignInForm from "@/components/SignInForm";
import WithoutAuthLayout from "@/layout/WithoutAuthLayout";
import styles from "@/styles/authPage.module.scss";
function Home() {
  return (
    <main className={styles.authWrapper}>
      <Intro />
      <SignInForm />
    </main>
  );
}

export default Home;

Home.getLayout = function PageLayout(page) {
  return <WithoutAuthLayout>{page}</WithoutAuthLayout>;
};
