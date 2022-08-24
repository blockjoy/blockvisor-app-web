import { Layout } from '@shared/components';
import type { NextPage } from 'next';

// svelte version of the app uses index page for auth check and login form
const Login: NextPage = () => {
  return (
    <Layout title="Login">
      <div>Login form goes here</div>
      <input />
      <p>adsdadasdad</p>
    </Layout>
  );
};

export default Login;
