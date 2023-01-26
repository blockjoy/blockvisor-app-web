import { useIdentityRepository } from '@modules/auth';
import {
  organizationAtoms,
  useAcceptInvitation,
  useDeclineInvitations,
  useReceivedInvitations,
} from '@modules/organization';
import { Badge, Button } from '@shared/components';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvitations.styles';

export const OrganizationInvitations = () => {
  const client = useQueryClient();
  const { declineInvitation } = useDeclineInvitations();
  const { acceptInvitation } = useAcceptInvitation();

  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;
  useReceivedInvitations(userId ?? '');

  const invitations: ClientOrganizationInvitation[] = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );

  const handleAcceptInvitation = (invitationId: string) => {
    acceptInvitation({ invitationId: invitationId });
  };

  const handleDeclineInvitation = (invitationId: string) => {
    declineInvitation({ invitationId: invitationId });
  };

  return (
    <div css={styles.wrapper}>
      <header css={styles.header}>
        Invitations
        {invitations?.length && <Badge>{invitations?.length}</Badge>}
      </header>
      <ul>
        {invitations?.map((invite, idx) => (
          <li css={styles.item} key={idx}>
            <div css={[spacing.bottom.medium]}>
              <b>{invite.createdByUserName || 'Unknown'}</b> invited you to join{' '}
              <b>{invite.createdForOrgName || 'Unknown'}</b> organization
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
