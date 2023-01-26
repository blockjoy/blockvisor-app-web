import { useSentInvitations } from '@modules/organization/hooks/useInvitations';
import { FC } from 'react';
import { styles } from './OrganizationPendingInvitations.styles';
import { Badge, Table } from '@shared/components';
import { mapInvitesToRows } from '@modules/organization/utils/toRow';

type Props = {
  orgId: string;
};

export const OrganizationPendingInvitations: FC<Props> = ({ orgId }) => {
  const { sentInvitations } = useSentInvitations(orgId);

  if (!sentInvitations?.length) return null;

  const rows = mapInvitesToRows(sentInvitations);

  return (
    <>
      <h2 css={styles.header}>
        Pending Invitations{' '}
        {Boolean(sentInvitations?.length) && (
          <Badge>{sentInvitations?.length}</Badge>
        )}
      </h2>

      <Table
        headers={[
          { key: '1', name: 'Email' },
          { key: '2', name: 'Created' },
        ]}
        rows={rows}
        isLoading={false}
      />
    </>
  );
};
