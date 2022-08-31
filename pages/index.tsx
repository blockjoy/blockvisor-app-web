import { LoginFooter, LoginForm } from '@modules/auth';
import { AuthLayout } from '@modules/layout';
import type { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <AuthLayout layoutTitle='Login'>
      <LoginForm />
      <LoginFooter />
    </AuthLayout>
  );
};

export default Login;
