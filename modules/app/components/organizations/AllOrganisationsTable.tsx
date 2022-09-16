import { FC } from 'react';
import { Table } from '../shared';

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
  return (
    <Table
      isLoading={false}
      headers={headers}
      rows={rows}
      onRowClick={() => console.log('la')}
    />
  );
};
