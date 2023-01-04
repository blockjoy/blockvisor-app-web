import { useIdentityRepository } from '@modules/auth';
import { organizationAtoms, useInvitations } from '@modules/organization';
import { Badge, Button } from '@shared/components';
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
        {invitations?.map((invite) => (
          <li css={styles.item}>
            <div css={[spacing.bottom.medium]}>
              <b>{invite.inviterName || 'Unknown'}</b> invited you to join{' '}
              <b>{invite.inviterOrganization || 'Unknown'} organization</b>
            </div>
            <div css={styles.buttons}>
              <Button size="medium">Accept</Button>
              <Button size="medium" style="outline">
                Decline
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
