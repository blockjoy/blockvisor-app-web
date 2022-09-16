import { Table } from '@modules/app/components/shared';
import { FC, useEffect } from 'react';
import { useOrganisations } from '../hooks/useOrganizations';

const rows: Row[] = [
  {
    key: 'first',
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>lala</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>lala</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>lala</p>
          </>
        ),
      },
    ],
  },
  {
    key: 'second',
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>lala</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>lala</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>lala</p>
          </>
        ),
      },
    ],
  },
  {
    key: 'third',
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>lala</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>lala</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>lala</p>
          </>
        ),
      },
    ],
  },
];

const headers: TableHeader[] = [
  {
    name: 'Org. Name',
    key: '1',
  },
  {
    name: 'Members',
    key: '2',
  },
];

export const AllOrganisationsTable: FC = () => {
  const { getOrganizations, organisations, loadingOrganizations } =
    useOrganisations();

  useEffect(() => {
    getOrganizations();
  }, []);
  console.log('orgs', organisations);
  return (
    <Table
      isLoading={loadingOrganizations}
      headers={headers}
      rows={rows}
      onRowClick={() => console.log('la')}
    />
  );
};
