import "../styles/variables.scss";
import "../styles/css-resets.scss";
import "../styles/global.scss";
import { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import DashboardLayout from "@/layout/DashboardLayout";
import useStore from "../store";

export default function App({ Component, pageProps }) {
  const accountType = useStore((state) => state.accountType);
  const setAccountType = useStore((state) => state.setAccountType);
  useEffect(() => {
    setAccountType("Super Admin");
  }, [setAccountType]);

  if (Component.getLayout) {
    return Component.getLayout(
      <Fragment>
        <ToastContainer />
        <Component {...pageProps} />
      </Fragment>
    );
  }
  return (
    <DashboardLayout accountType={accountType}>
      <ToastContainer />
      <Component {...pageProps} />
    </DashboardLayout>
  );
}
