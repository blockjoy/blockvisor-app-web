import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('identity');
    router.push('/?invited=true&redirect=/organizations');
  }, []);

  return null;
};

export default AcceptInvite;
