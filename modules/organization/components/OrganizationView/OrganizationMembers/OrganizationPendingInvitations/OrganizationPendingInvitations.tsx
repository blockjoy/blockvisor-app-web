import { useInvitations } from '@modules/organization/hooks/useInvitations';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './OrganizationPendingInvitations.styles';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@shared/components';

type Props = {
  orgId: string;
};

export const OrganizationPendingInvitations: FC<Props> = ({ orgId }) => {
  const { getSentInvitations } = useInvitations();

  const invitations = useRecoilValue(
    organizationAtoms.organizationSentInvitations,
  );

  useEffect(() => {
    if (orgId) {
      getSentInvitations(orgId);
    }
  }, [orgId]);

  if (!invitations?.length) return null;

  return (
    <>
      <h2 css={styles.header}>
        Pending Member Invitations{' '}
        {Boolean(invitations?.length) && <Badge>{invitations?.length}</Badge>}
      </h2>
      <ul css={styles.list}>
        {invitations?.map((invite) => (
          <li key={invite.inviteeEmail}>
            <span css={styles.email}>{invite.inviteeEmail}</span>
            <span css={styles.created}>
              {formatDistanceToNow(new Date(invite.createdAtString), {
                addSuffix: true,
              })}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
