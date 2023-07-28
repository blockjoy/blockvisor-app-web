import { authAtoms } from '@modules/auth';
import { invitationClient } from '@modules/grpc';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
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

          console.log('receivedInvitations', receivedInvitations);

          const activeInvitation = receivedInvitations.find(
            (i) => i.id === invitation_id,
          );

          console.log('activeInvitation', activeInvitation);

          await acceptInvitation(invitation_id as string);

          await getOrganizations();

          setDefaultOrganization({
            id: activeInvitation?.orgId!,
            name: activeInvitation?.orgName!,
          });

          router.push(`/organizations/${activeInvitation?.orgId}`);

          toast.success('Joined Organization');
        } catch (err) {
          router.push({
            pathname: ROUTES.LOGIN,
            query: { invitation_id, invited: true },
          });
        }
      })();
    }
  }, [router.isReady]);

  return null;
};

export default AcceptInvite;
