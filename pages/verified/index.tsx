import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { ROUTES } from '@shared/constants/routes';
import { useSignIn } from '@modules/auth';
import { useDefaultOrganization } from '@modules/organization';

const Verified: NextPage = () => {
  const router = useRouter();

  const signIn = useSignIn();

  const { setDefaultOrganization } = useDefaultOrganization();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      (async () => {
        try {
          setDefaultOrganization(null);

          const accessToken = await authClient.registration_confirmation(
            token?.toString()!,
          );
          await signIn(undefined, accessToken);
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
