import { LoginFooter, LoginForm } from '@modules/auth';
import { Layout } from '@shared/components';
import type { NextPage } from 'next';

// svelte version of the app uses index page for auth check and login form
const Login: NextPage = () => {
  return (
    <Layout title="Login">
      <LoginForm />
      <LoginFooter />
    </Layout>
  );
};

export default Login;
