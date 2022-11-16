import type { NextPage } from 'next';
import { NewPasswordForm } from '@modules/auth';
import { Layout } from '@shared/components';

const SetNewPassword: NextPage = () => {
  return (
    <Layout title="Set a New Password">
      <NewPasswordForm />
    </Layout>
  );
};

export default SetNewPassword;
