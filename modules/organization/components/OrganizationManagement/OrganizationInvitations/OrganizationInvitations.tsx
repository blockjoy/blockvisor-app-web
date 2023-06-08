import { useIdentityRepository } from '@modules/auth';
import {
  organizationAtoms,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { Badge, Button } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvitations.styles';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';

export const OrganizationInvitations = () => {
  const { acceptInvitation, declineInvitation, getReceivedInvitations } =
    useInvitations();
  const { getOrganizations } = useGetOrganizations();

  const repository = useIdentityRepository();
  const userEmail = repository?.getIdentity()?.email;

  const invitations: Invitation[] = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );

  const handleAcceptInvitation = (invitationId: string) => {
    acceptInvitation(invitationId, () => {
      getOrganizations();
      getReceivedInvitations(userEmail!);
    });
  };

  const handleDeclineInvitation = (invitationId: string) => {
    declineInvitation(invitationId, () => getReceivedInvitations(userEmail!));
  };

  return (
    <div css={styles.wrapper}>
      <header css={styles.header}>
        Invitations
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
                onClick={() => handleAcceptInvitation(invite.id!)}
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
