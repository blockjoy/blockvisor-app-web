import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';

const DeclineRegistered: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { invitation_id } = router.query;
      router.push({
        pathname: ROUTES.LOGIN,
        query: { invitation_id },
      });
    }
  }, [router.isReady]);

  return (
    <Layout title="Invitation Declined">
      <p>You have declined this invitation</p>
    </Layout>
  );
};

export default DeclineRegistered;
