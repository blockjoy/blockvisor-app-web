import { useIdentityRepository } from '@modules/auth';
import {
  organizationAtoms,
  useGetOrganizations,
  useInvitations,
} from '@modules/organization';
import { Badge, Button } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvitations.styles';

export const OrganizationInvitations = () => {
  const { acceptInvitation, declineInvitation, getReceivedInvitations } =
    useInvitations();
  const { getOrganizations } = useGetOrganizations();

  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const invitations = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );

  const handleAcceptInvitation = (invitationId: string) => {
    acceptInvitation({ invitationId: invitationId }, () => {
      getOrganizations();
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
        {invitations?.map((invite) => (
          <li css={styles.item}>
            <div css={[spacing.bottom.medium]}>
              <b>{invite.inviterName || 'Unknown'}</b> invited you to join{' '}
              <b>{invite.inviterOrganization || 'Unknown'} organization</b>
            </div>
            <div css={styles.buttons}>
              <Button
                size="small"
                onClick={() => handleAcceptInvitation(invite.id)}
              >
                Accept
              </Button>
              <Button
                size="small"
                onClick={() => handleDeclineInvitation(invite.id)}
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
