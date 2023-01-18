import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';

const Verified: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      (async () => {
        try {
          await apiClient.registration_confirmation(token?.toString()!);
          router.push('/?verified=true');
        } catch (err: any) {
          toast.error('Error Verifying');
          return;
        }
      })();
    }
  }, [router.isReady]);

  return null;
};

export default Verified;
