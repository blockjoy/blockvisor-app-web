import type { NextPage } from 'next';

import { useGrpc } from '@modules/auth';

interface IPerson {
  name: string;
  age: number;
  isEmployed?: boolean;
  walk: () => void
}

// svelte version of the app uses index page for auth check and login form
const Login: NextPage = () => {

  const [client] = useGrpc();

  const response = client?.login("user@test.com", "test");

  if ((response as any)?.code === "Unauthenticated") {
    // it error'd
    const { code } = (response as any);
    console.log(code);
  } else {
    // it worked
    const result = (response as any)?.toObject();
    console.log(result?.token?.value);
  }

 
  return (
    <div>
      <main>Login</main>
    </div>
  );
};

export default Login;
