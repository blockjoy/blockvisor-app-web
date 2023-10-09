import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ROUTES } from '@shared/constants/routes';
import { invitationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { PageSpinner } from '@shared/components';

const DeclineRegistered: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const { invitation_id } = router.query;

      (async () => {
        try {
          await invitationClient.declineInvitation(invitation_id as string);
          toast.success('Invitation Declined');
          router.push({
            pathname: ROUTES.NODES,
          });
        } catch (err) {
          router.push({
            pathname: ROUTES.LOGIN,
            query: { invitation_id },
          });
        }
      })();
    }
  }, [router.isReady]);

  return <PageSpinner />;
};

export default DeclineRegistered;
