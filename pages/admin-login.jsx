import AdminLoginNav from "@/components/nav/AdminLoginNav";
import styles from "../styles/layout/WithoutAuthLayout.module.scss";
import AdminLoginForm from "@/components/AdminLoginForm";

function AdminLogin() {
  return <AdminLoginForm />;
}

export default AdminLogin;

AdminLogin.getLayout = function PageLayout(page) {
  return (
    <div className="wrapper maxWidthWrapper">
      <div className={styles.dashboardLayout}>
        <div className={styles.content}>
          <AdminLoginNav />
          <div className={styles.page}>{page}</div>
        </div>
      </div>
    </div>
  );
};
