import WithoutAuthLayout from '@/layout/WithoutAuthLayout';
import React from 'react'

export default function AdminLogin() {
	return (
		<div>AdminLogin</div>
	)
}
AdminLogin.getLayout = function PageLayout(page) {
  return <WithoutAuthLayout>{page}</WithoutAuthLayout>;
};