import { LoginFooter, LoginForm, PublicRoute } from '@modules/auth';
import { Layout } from '@shared/components';
import type { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <PublicRoute>
      <Layout title="Login">
        <LoginForm />
        <LoginFooter />
      </Layout>
    </PublicRoute>
  );
};

export default Login;
