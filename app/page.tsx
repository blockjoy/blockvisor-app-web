'use client';

import { LoginFooter, LoginForm, PublicRoute } from '@modules/auth';
import { Layout } from '@shared/components';

export default function Login() {
  return (
    <PublicRoute>
      <Layout title="Login">
        <LoginForm />
        <LoginFooter />
      </Layout>
    </PublicRoute>
  );
}
