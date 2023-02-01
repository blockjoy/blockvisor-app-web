import { ROUTES } from '@shared/constants/routes';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('identity');
    if (router.isReady) {
      const { token } = router.query;

      // temp fix to redirect to organizations once verified
      localStorage.setItem('redirect', 'organizations');
      router.push({
        pathname: ROUTES.REGISTER,
        query: { token },
      });
    }
  }, [router.isReady]);

  return null;
};

export default AcceptInvite;
