import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apiClient } from '@modules/client';
import { delay } from '@shared/utils/delay';

export const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;

      (async () => {
        const response: any = await apiClient.registration_confirmation(
          token?.toString()!,
        );

        if (response.code === 20) {
          return;
        }

        await delay(3000);

        router.push('/');
      })();
    }
  }, [router.isReady]);

  return null;
};
