import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authClient, invitationClient, userClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { ROUTES } from '@shared/constants/routes';
import { useSignIn } from '@modules/auth';
import {
  useDefaultOrganization,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
import { readToken } from '@shared/utils/readToken';
import { PageSpinner } from '@shared/components';

const Verified: NextPage = () => {
  const router = useRouter();
  const signIn = useSignIn();
  const { setDefaultOrganization } = useDefaultOrganization();
  const { acceptInvitation } = useInvitations();
  const { getOrganizations } = useGetOrganizations();

  useEffect(() => {
    if (router.isReady) {
      const { token: emailToken } = router.query;
      (async () => {
        try {
          const accessToken = await authClient.registrationConfirmation(
            emailToken?.toString()!,
          );
          await signIn(undefined, accessToken);

          const accessTokenObject = readToken(accessToken);
          const emailTokenObject = readToken(emailToken as string);
          const user = await userClient.getUser(accessTokenObject.resource_id);

          await getOrganizations(true, false, user.id);

          const invitationId = emailTokenObject?.data?.invitation_id;

          if (invitationId) {
            const receivedInvitations =
              await invitationClient.receivedInvitations(user?.email!);

            const invitation = receivedInvitations.find(
              (invitation) => invitation.id === invitationId,
            );

            await acceptInvitation(invitationId);
            await getOrganizations();

            if (invitation) {
              await setDefaultOrganization(
                {
                  id: invitation.orgId,
                  name: invitation.orgName,
                },
                user.id,
              );
            }
          }

          router.push({
            pathname: ROUTES.NODES,
            query: { verified: true },
          });
        } catch (err) {
          console.log('error verifying', err);
          toast.error('Error Verifying');
          return;
        }
      })();
    }
  }, [router.isReady]);

  return <PageSpinner />;
};

export default Verified;
