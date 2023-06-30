import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { ROUTES } from '@shared/constants/routes';
import { useIdentityRepository } from '@modules/auth';

const Verified: NextPage = () => {
  const router = useRouter();

  const repository = useIdentityRepository();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      (async () => {
        try {
          const accessToken = await authClient.registration_confirmation(
            token?.toString()!,
          );

          console.log('accessToken', accessToken);

          repository?.saveIdentity({
            accessToken,
            verified: true,
          });

          router.push({
            pathname: ROUTES.NODES,
            query: { verified: true },
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
