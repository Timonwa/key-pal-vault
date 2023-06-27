import "../styles/variables.scss";
import "../styles/css-resets.scss";
import "../styles/global.scss";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import DashboardLayout from "@/layout/DashboardLayout";

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <Fragment>
        <ToastContainer />
        <Component {...pageProps} />
      </Fragment>
    );
  }
  return (
    <DashboardLayout>
      <ToastContainer />
      <Component {...pageProps} />
    </DashboardLayout>
  );
}
