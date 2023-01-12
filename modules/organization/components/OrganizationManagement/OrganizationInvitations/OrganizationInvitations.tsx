import { useIdentityRepository } from '@modules/auth';
import { organizationAtoms, useInvitations } from '@modules/organization';
import { Button } from '@shared/components';
import { Badge } from '@shared/components/Badge/Badge';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvitations.styles';

const tabs = [
  {
    name: 'Sent',
    alerts: 0,
  },
  {
    name: 'Received',
    alerts: 0,
  },
];

export const OrganizationInvitations = () => {
  const { acceptInvitation, declineInvitation } = useInvitations();

  const invitations = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );

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
              <b>{invite.inviterName || 'Unknown'}</b> invited you to join{' '}
              <b>{invite.inviterOrganization || 'Unknown'} organization</b>
            </div>
            <div css={styles.buttons}>
              <Button
                size="small"
                onClick={() => acceptInvitation({ invitationId: invite.id })}
              >
                Accept
              </Button>
              <Button
                size="small"
                onClick={() => declineInvitation({ invitationId: invite.id })}
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
