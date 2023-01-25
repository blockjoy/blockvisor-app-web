import { Button } from '@shared/components';
import { flex } from 'styles/utils.flex.styles';
import { USER_ROLES } from '@modules/auth/hooks/useHasPermissions';

export const mapOrganizationsToRows = (
  organizations?: ClientOrganization[],
) => {
  const headers: TableHeader[] = [
    {
      name: 'Org. Name',
      key: '1',
      width: '300px',
    },
    {
      name: 'Members',
      key: '2',
      width: '300px',
    },
    {
      name: 'Role',
      key: '3',
      width: '300px',
    },
    {
      name: '',
      key: '4',
    },
  ];

  const rows = organizations?.map((org, idx) => ({
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
            <p>{USER_ROLES[org?.currentUser?.role!]}</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <>
            {!org.personal && (
              <div css={[flex.display.flex]}>
                <Button style="outline" size="small">
                  Manage
                </Button>
              </div>
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
