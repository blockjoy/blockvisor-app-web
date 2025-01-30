import { useIdentityRepository } from '@modules/auth';
import {
  invitationAtoms,
  useGetOrganization,
  useGetOrganizations,
  useInvitations,
  useSwitchOrganization,
} from '@modules/organization';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { Badge, Button } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationReceivedInvitations.styles';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { useState } from 'react';

export const OrganizationReceivedInvitations = () => {
  const router = useRouter();

  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const { acceptInvitation, declineInvitation, getReceivedInvitations } =
    useInvitations();

  const { switchOrganization } = useSwitchOrganization();

  const { getOrganizations } = useGetOrganizations();

  const { getOrganization } = useGetOrganization();

  const repository = useIdentityRepository();
  const userEmail = repository?.getIdentity()?.email;

  const invitations: Invitation[] = useRecoilValue(
    invitationAtoms.receivedInvitations,
  );

  const handleAcceptInvitation = (invitation: Invitation) => {
    setIsAccepting(true);
    acceptInvitation(invitation.invitationId, async () => {
      await getOrganizations(true, false);
      switchOrganization(invitation.orgId, invitation.orgName);
      getOrganization(invitation.orgId);
      getReceivedInvitations(userEmail!);
      router.push(ROUTES.ORGANIZATION(invitation?.orgId));
    });
  };

  const handleDeclineInvitation = async (invitationId: string) => {
    setIsDeclining(true);
    await declineInvitation(invitationId, () =>
      getReceivedInvitations(userEmail!),
    );
    setIsDeclining(false);
  };

  return (
    <div css={styles.wrapper}>
      <header css={styles.header}>
        Notifications
        {invitations?.length && (
          <Badge color="danger">{invitations?.length}</Badge>
        )}
      </header>
      <ul>
        {invitations?.map((invite) => (
          <li key={invite.invitationId} css={styles.item}>
            <div css={[spacing.bottom.medium]}>
              You have been invited to join{' '}
              <b>{escapeHtml(invite.orgName!) || 'Unknown'}</b> organization
            </div>
            <div css={styles.buttons}>
              <Button
                size="small"
                style="secondary"
                onClick={() => handleAcceptInvitation(invite)}
                loading={isAccepting}
              >
                Accept
              </Button>
              <Button
                size="small"
                onClick={() => handleDeclineInvitation(invite.invitationId!)}
                style="outline"
                loading={isDeclining}
              >
                Decline
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
