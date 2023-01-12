import { useInvitations } from '@modules/organization/hooks/useInvitations';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './OrganizationPendingInvitations.styles';
import { formatDistanceToNow } from 'date-fns';
import { Badge, Table } from '@shared/components';
import { mapInvitesToRows } from '@modules/organization/utils/toRow';

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

  const rows = mapInvitesToRows(invitations);

  return (
    <>
      <h2 css={styles.header}>
        Pending Invitations{' '}
        {Boolean(invitations?.length) && <Badge>{invitations?.length}</Badge>}
      </h2>

      <Table
        headers={[
          { key: '1', name: 'Email' },
          { key: '2', name: 'Created' },
        ]}
        rows={rows}
        isLoading="finished"
      />
    </>
  );
};
