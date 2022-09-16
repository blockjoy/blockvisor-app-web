import { Table } from '@modules/app/components/shared';
import { Button } from '@shared/components';
import { FC, useEffect } from 'react';
import { useOrganisations } from '../hooks/useOrganisations';

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

const mapOrganisationsToRows = (organisations?: Organisation[]) => {
  return organisations?.map((org, idx) => ({
    key: org.id?.value ?? `${idx}`,
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
            <Button style="outline" size="small">
              Members
            </Button>
          </>
        ),
      },
    ],
  }));
};

export const AllOrganisationsTable: FC = () => {
  const { getOrganizations, organisations, loadingOrganizations } =
    useOrganisations();

  useEffect(() => {
    getOrganizations();
  }, []);

  const rows = mapOrganisationsToRows(organisations);

  return (
    <Table isLoading={loadingOrganizations} headers={headers} rows={rows} />
  );
};
