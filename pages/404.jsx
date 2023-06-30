import Link from "next/link";
import React from "react";
import WithoutAuthLayout from "@/layout/WithoutAuthLayout";

export default function FourOhFour() {
  return (
    <div>
      <p>
        Oh oh! This page does not exist. Please go to{" "}
        <Link style={{ textDecoration: "underline" }} href="/">
          Home
        </Link>
      </p>
    </div>
  );
}

FourOhFour.getLayout = function PageLayout(page) {
  return <WithoutAuthLayout>{page}</WithoutAuthLayout>;
};
