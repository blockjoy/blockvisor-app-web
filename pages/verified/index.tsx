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
import { css, keyframes } from '@emotion/react';
import { ITheme } from 'types/theme';

const spin = keyframes`
    100% { transform: rotate(1turn); }
`;

const styles = {
  wrapper: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    gap: 30px;
  `,
  spinner: (theme: ITheme) => css`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 4px solid ${theme.colorInput};
    border-top-color: ${theme.colorPrimary};
    animation: ${spin} 0.8s infinite linear;
  `,
};

const Verified: NextPage = () => {
  const router = useRouter();
  const signIn = useSignIn();
  const { setDefaultOrganization } = useDefaultOrganization();
  const { acceptInvitation } = useInvitations();
  const { getOrganizations } = useGetOrganizations();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      (async () => {
        try {
          const accessToken = await authClient.registration_confirmation(
            token?.toString()!,
          );
          await signIn(undefined, accessToken);
          const accessTokenObject = readToken(accessToken);
          const user = await userClient.getUser(accessTokenObject.resource_id);

          const receivedInvitations =
            await invitationClient.receivedInvitations(user?.email!);

          const invitation = receivedInvitations[0];

          if (invitation) {
            await acceptInvitation(receivedInvitations[0].id);
            await getOrganizations();

            setDefaultOrganization({
              id: invitation.orgId,
              name: invitation.orgName,
            });

            router.push({
              pathname: ROUTES.NODES,
              query: { verified: true },
            });
          }
        } catch (err) {
          console.log('error verifying', err);
          toast.error('Error Verifying');
          return;
        }
      })();
    }
  }, [router.isReady]);

  return (
    <div css={styles.wrapper}>
      <div css={styles.spinner} />
    </div>
  );
};

export default Verified;
