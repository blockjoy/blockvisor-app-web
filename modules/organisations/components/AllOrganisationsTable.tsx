import { Table } from '@modules/app/components/shared';
import { Button } from '@shared/components';
import { FC, useEffect } from 'react';
import { useOrganisations } from '../hooks/useOrganisations';
import { flex } from 'styles/utils.flex.styles';

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
            <p>{org.personal ? 'Personal' : 'Other'}</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <div css={[flex.display.flex]}>
            <Button
              href={`organisations/${org.id?.value}`}
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
