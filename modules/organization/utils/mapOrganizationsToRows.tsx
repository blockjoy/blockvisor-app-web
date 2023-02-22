import { Button } from '@shared/components';
import { flex } from 'styles/utils.flex.styles';
import { USER_ROLES } from '@modules/auth/hooks/useHasPermissions';
import { escapeHtml } from '@shared/utils/escapeHtml';

export const mapOrganizationsToRows = (
  organizations?: ClientOrganization[],
) => {
  const headers: TableHeader[] = [
    {
      name: 'Org. Name',
      dataField: 'name',
      key: '1',
      minWidth: '300px',
      maxWidth: '300px',
      width: '300px',
      sort: true,
    },
    {
      name: 'Members',
      key: '2',
      width: '180px',
      minWidth: '180px',
      maxWidth: '180px',
      dataField: 'memberCount',
      sort: true,
    },
    {
      name: 'Role',
      key: '3',
      width: '180px',
      minWidth: '180px',
      maxWidth: '180px',
    },
    {
      name: '',
      key: '4',
      textAlign: 'right',
    },
  ];

  const rows = organizations?.map((org, idx) => ({
    key: org.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        data: org.name,
        component: (
          <>
            <p>{escapeHtml(org.name!)}</p>
          </>
        ),
      },
      {
        key: '2',
        data: org.memberCount,
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
            <p>{USER_ROLES[org?.currentUser?.role!]}</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <>
            {!org.personal && (
              <Button style="outline" size="small">
                Manage
              </Button>
            )}
          </>
        ),
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
