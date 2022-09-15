import { LoginFooter, LoginForm } from '@modules/auth';
import { authAtoms } from '@modules/auth/store/authAtoms';
import { Layout } from '@shared/components';
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
    <Layout title="Login">
      <LoginForm />
      <LoginFooter />
    </Layout>
  );
};

export default Login;
