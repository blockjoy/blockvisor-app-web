import type { NextPage } from 'next';
import { NewPasswordForm } from '@modules/auth';
import { Layout } from '@shared/components';

const SetNewPassword: NextPage = () => {
  return (
    <Layout title="Reset your password" overflow="visible">
      <NewPasswordForm />
    </Layout>
  );
};

export default SetNewPassword;
