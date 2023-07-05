import { RegisterForm } from '@modules/auth';
import { Layout } from '@shared/components';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
  const router = useRouter();

  const { token } = router.query;

  return (
    <Layout
      title={token ? 'Create Account' : 'Access Denied'}
      overflow="visible"
    >
      {token ? (
        <RegisterForm />
      ) : (
        <p>You need to be invited to start using BlockJoy.</p>
      )}
    </Layout>
  );
};

export default Register;
