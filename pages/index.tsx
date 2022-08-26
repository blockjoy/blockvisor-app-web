import { LoginFooter, LoginForm } from '@modules/auth';
import { Layout } from '@shared/components';
import type { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <Layout title="Login">
      <LoginForm />
      <LoginFooter />
    </Layout>
  );
};

export default Login;
