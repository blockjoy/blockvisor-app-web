import type { NextPage } from 'next';
import { NewPasswordForm } from '@modules/auth';
import { Layout } from '@shared/components';

const SetNewPassword: NextPage = () => {
  return (
    <Layout title="Reset your password">
      <NewPasswordForm />
    </Layout>
  );
};

export default SetNewPassword;
