import { Button, Table } from '@shared/components';
import { FC } from 'react';
import { flex } from 'styles/utils.flex.styles';
import { useGetOrganizations } from '@modules/organization';

const headers: TableHeader[] = [
  {
    name: 'Org. Name',
    key: '1',
    width: '300px',
  },
  {
    name: 'Type',
    key: '3',
    width: '300px',
  },
  {
    name: '',
    key: '4',
  },
];

export const mapOrganizationsToRows = (
  organizations?: ClientOrganization[],
) => {
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
  const { organizations, isLoading } = useGetOrganizations();

  const rows = mapOrganizationsToRows(organizations);
  return <Table isLoading={isLoading} headers={headers} rows={rows} />;
};
