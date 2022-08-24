import { Layout } from '@shared/components';
import { Input } from '@shared/components/Input';
import type { NextPage } from 'next';

// svelte version of the app uses index page for auth check and login form
const Login: NextPage = () => {
  return (
    <Layout title="Login">
      <div>Login form goes here</div>
      <Input required={true} name="email" placeholder="Email" />
    </Layout>
  );
};

export default Login;
