import { Button, Table } from '@shared/components';
import { FC, useEffect } from 'react';
import { flex } from 'styles/utils.flex.styles';
import { useGetOrganizations } from '../hooks/useGetOrganizations';

const headers: TableHeader[] = [
  {
    name: 'Org. Name',
    key: '1',
  },
  {
    name: 'Members',
    key: '2',
  },
  {
    name: 'Type',
    key: '3',
  },
];

const mapOrganizationsToRows = (organizations?: ClientOrganization[]) => {
  return organizations?.map((org, idx) => ({
    key: org.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{org.name}</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{org.memberCount}</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>{org.personal ? 'Personal' : 'Other'}</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <div css={[flex.display.flex]}>
            <Button
              href={`organizations/${org.id}`}
              style="outline"
              size="small"
            >
              Edit
            </Button>
          </div>
        ),
      },
    ],
  }));
};

export const AllOrganizationsTable: FC = () => {
  const { getOrganizations, loading, organizations } = useGetOrganizations();

  useEffect(() => {
    getOrganizations();
  }, []);

  const rows = mapOrganizationsToRows(organizations);
  return <Table isLoading={loading} headers={headers} rows={rows} />;
};
