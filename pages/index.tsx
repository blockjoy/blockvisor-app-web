import { LoginFooter, LoginForm } from '@modules/auth';
import { AuthLayout } from '@modules/layout';
import type { NextPage } from 'next';

// svelte version of the app uses index page for auth check and login form
const Login: NextPage = () => {
  return (
    <AuthLayout layoutTitle='Login'>
      <LoginForm />
      <LoginFooter />
    </AuthLayout>
  );
};

export default Login;
