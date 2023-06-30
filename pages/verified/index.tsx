import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { ROUTES } from '@shared/constants/routes';
import { useIdentityRepository, useSignIn } from '@modules/auth';

const Verified: NextPage = () => {
  const router = useRouter();

  const signIn = useSignIn();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      (async () => {
        try {
          const accessToken = await authClient.registration_confirmation(
            token?.toString()!,
          );
          console.log('token from confirmation', accessToken);
          signIn(undefined, accessToken);
          // router.push({
          //   pathname: ROUTES.NODES,
          //   query: { verified: true },
          // });
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
