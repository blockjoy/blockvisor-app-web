import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apiClient } from '@modules/client';
import { Layout } from '@shared/components';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;

      (async () => {
        const response: any = await apiClient.declineInvitation({
          token: token?.toString()!,
        });

        if (response.code === 20) {
          return;
        }
      })();
    }
  }, [router.isReady]);

  return (
    <Layout title="Invitation Declined">
      <p>You have declined this invitation</p>
    </Layout>
  );
};

export default AcceptInvite;
