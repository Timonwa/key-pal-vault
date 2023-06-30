import AdminLoginForm from "@/components/AdminLoginForm";
import WithoutAuthLayout from "@/layout/WithoutAuthLayout";
import React from "react";

export default function AdminLogin() {
  return <AdminLoginForm />;
}
AdminLogin.getLayout = function PageLayout(page) {
  return <WithoutAuthLayout>{page}</WithoutAuthLayout>;
};
