import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apiClient } from '@modules/client';

const Verified: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      (async () => {
        try {
          router.push('/?verified=true');

          await apiClient.registration_confirmation(token?.toString()!);
        } catch (err: any) {
          console.log('error', err);
          return;
        }
      })();
    }
  }, [router.isReady]);

  return null;
};

export default Verified;
