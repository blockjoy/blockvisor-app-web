import { Button } from '@shared/components';
import { USER_ROLES } from '@modules/auth/hooks/useHasPermissions';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { getOrgMemberRole } from './getOrgMemberRole';

export const mapOrganizationsToRows = (
  organizations: Org[],
  userId: string,
) => {
  const headers: TableHeader[] = [
    {
      name: 'Org. Name',
      key: '1',
      minWidth: '300px',
      maxWidth: '300px',
      width: '300px',
      dataField: 'name',
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
            <p>{USER_ROLES[getOrgMemberRole(org!, userId)]}</p>
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
