import { useGetOrganizationMembers } from '@modules/organizations/hooks/useGetMembers';
import { Button, Table } from '@shared/components';
import { useEffect } from 'react';
import { flex } from 'styles/utils.flex.styles';

type Props = {
  organizationId?: string;
};

const headers: TableHeader[] = [
  {
    name: 'First name',
    key: '1',
  },
  {
    name: 'Last name',
    key: '2',
  },
  {
    name: 'Email',
    key: '3',
  },
];

export const mapOrganizationMembersToRows = (
  organizationMembers?: ClientOrganizationMember[],
) => {
  return organizationMembers?.map((member, idx) => ({
    key: member.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{member.firstName}</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{member.lastName}</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>{member.email}</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <div css={[flex.display.flex]}>
            <Button
              style="secondary"
              size="small"
            >
              Remove
            </Button>
          </div>
        ),
      },
    ],
  }));
};

export function MembersTable({ organizationId }: Props) {
  const { getOrganizationMembers, organizationMembers, isLoading } = useGetOrganizationMembers();

  useEffect(() => {
    if (organizationId) {
      getOrganizationMembers(organizationId);
    }
  }, []);

  const rows = mapOrganizationMembersToRows(organizationMembers);
  return <Table isLoading={isLoading} headers={headers} rows={rows} />;
}
