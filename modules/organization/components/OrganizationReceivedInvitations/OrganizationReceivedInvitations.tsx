import { useIdentityRepository } from '@modules/auth';
import {
  invitationAtoms,
  useDefaultOrganization,
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

export const OrganizationReceivedInvitations = () => {
  const router = useRouter();

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
    acceptInvitation(invitation.id, async () => {
      await getOrganizations();
      switchOrganization(invitation.orgId, invitation.orgName);
      getOrganization(invitation.orgId);
      getReceivedInvitations(userEmail!);
      router.push(ROUTES.ORGANIZATION(invitation?.orgId));
    });
  };

  const handleDeclineInvitation = (invitationId: string) => {
    declineInvitation(invitationId, () => getReceivedInvitations(userEmail!));
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
          <li key={invite.id} css={styles.item}>
            <div css={[spacing.bottom.medium]}>
              <b>{escapeHtml(invite.createdByName!) || 'Unknown'}</b> invited
              you to join <b>{escapeHtml(invite.orgName!) || 'Unknown'}</b>{' '}
              organization
            </div>
            <div css={styles.buttons}>
              <Button
                size="small"
                style="secondary"
                onClick={() => handleAcceptInvitation(invite)}
              >
                Accept
              </Button>
              <Button
                size="small"
                onClick={() => handleDeclineInvitation(invite.id!)}
                style="outline"
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
