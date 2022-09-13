import { authAtoms, LoginFooter, LoginForm } from '@modules/auth';
import { AuthLayout } from '@modules/layout';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const Login: NextPage = () => {
  const [auth] = useRecoilState(authAtoms.user);

  useEffect(() => {
    if (auth) {
      Router.push('/dashboard');
    }
  }, []);
  return (
    <AuthLayout layoutTitle="Login">
      <LoginForm />
      <LoginFooter />
    </AuthLayout>
  );
};

export default Login;
