import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { ROUTES } from '@shared/constants/routes';

const Verified: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      (async () => {
        try {
          await authClient.registration_confirmation(token?.toString()!);
          router.push({
            pathname: ROUTES.LOGIN,
            query: { verified: true, token },
          });
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
