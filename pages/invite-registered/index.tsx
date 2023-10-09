import { authAtoms } from '@modules/auth';
import { invitationClient } from '@modules/grpc';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
import { PageSpinner } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  const user = useRecoilValue(authAtoms.user);

  const { acceptInvitation } = useInvitations();

  const { getOrganizations } = useGetOrganizations();

  const { setDefaultOrganization } = useDefaultOrganization();

  useEffect(() => {
    if (router.isReady) {
      const { invitation_id } = router.query;

      (async () => {
        try {
          const receivedInvitations =
            await invitationClient.receivedInvitations(user?.email!);

          const activeInvitation = receivedInvitations.find(
            (i) => i.id === invitation_id,
          );

          await acceptInvitation(invitation_id as string);

          await getOrganizations();

          setDefaultOrganization({
            id: activeInvitation?.orgId!,
            name: activeInvitation?.orgName!,
          });

          toast.success(`Joined ${activeInvitation?.orgName!}`);

          router.push(ROUTES.NODES);
        } catch (err) {
          router.push({
            pathname: ROUTES.LOGIN,
            query: { invitation_id, invited: true },
          });
        }
      })();
    }
  }, [router.isReady]);

  return <PageSpinner />;
};

export default AcceptInvite;
