import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apiClient } from '@modules/client';
import { delay } from '@shared/utils/delay';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;

      (async () => {
        const response: any = await apiClient.declineInvitation({
          token: token?.toString()!,
        });

        console.log('declineInvitation', response);

        if (response.code === 20) {
          return;
        }

        // await delay(3000);

        // router.push('/');
      })();
    }
  }, [router.isReady]);

  return null;
};

export default AcceptInvite;
