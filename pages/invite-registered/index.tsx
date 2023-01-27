import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('identity');
    if (router.isReady) {
      router.push(`/?invited=true&redirect=organizations`);
    }
  }, [router.isReady]);

  return null;
};

export default AcceptInvite;
