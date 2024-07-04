import { escapeHtml } from '@shared/utils/escapeHtml';
import { Org, OrgSortField } from '@modules/grpc/library/blockjoy/v1/org';

export const mapOrganizationsToRows = (
  organizations: Org[],
  userId: string,
) => {
  const headers: TableHeader[] = [
    {
      name: 'Org. Name',
      key: '1',
      minWidth: '100%',
      maxWidth: '100%',
      width: '100%',
      dataField: OrgSortField.ORG_SORT_FIELD_NAME,
    },
  ];

  const rows = organizations?.map((org, idx) => ({
    key: org.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        data: org.name,
        component: <p>{escapeHtml(org.name!)}</p>,
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
