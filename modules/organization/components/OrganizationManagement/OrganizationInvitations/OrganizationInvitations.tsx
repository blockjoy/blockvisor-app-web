import { useIdentityRepository } from '@modules/auth';
import { organizationAtoms, useInvitations } from '@modules/organization';
import { Badge, Button } from '@shared/components';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvitations.styles';

export const OrganizationInvitations = () => {
  const client = useQueryClient();
  const { acceptInvitation, declineInvitation, getReceivedInvitations } =
    useInvitations();

  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const invitations: ClientOrganizationInvitation[] = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );

  const handleAcceptInvitation = (invitationId: string) => {
    acceptInvitation({ invitationId: invitationId }, () => {
      client.invalidateQueries({ queryKey: ['organizations'] });
      getReceivedInvitations(userId!);
    });
  };

  const handleDeclineInvitation = (invitationId: string) => {
    declineInvitation({ invitationId: invitationId }, () =>
      getReceivedInvitations(userId!),
    );
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
