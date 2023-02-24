import { RegisterFooter, RegisterForm } from '@modules/auth';
import { Layout } from '@shared/components';
import type { NextPage } from 'next';

const Register: NextPage = () => {
  return (
    <Layout title="Create Account" overflow="visible">
      <RegisterForm />
      <RegisterFooter />
    </Layout>
  );
};

export default Register;
