import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      router.push(`/register?invited=true&token=${token}`);
    }
  }, []);

  return null;
};

export default AcceptInvite;
