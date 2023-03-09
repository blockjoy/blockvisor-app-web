import { ROUTES } from '@shared/constants/routes';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      router.push({
        pathname: ROUTES.LOGIN,
        query: { token, redirect: ROUTES.ORGANIZATIONS, invited: true },
      });
    }
  }, [router.isReady]);

  return null;
};

export default AcceptInvite;
