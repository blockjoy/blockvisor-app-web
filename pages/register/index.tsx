import { RegisterFooter, RegisterForm } from '@modules/auth';
import { Layout } from '@shared/components';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Register: NextPage = () => {
  useEffect(() => {
    localStorage.removeItem('identity');
  }, []);

  return (
    <Layout title="Create Account" overflow="visible">
      <RegisterForm />
      <RegisterFooter />
    </Layout>
  );
};

export default Register;
