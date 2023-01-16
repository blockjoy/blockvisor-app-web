import { Badge, Button } from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';

export const mapOrganizationMembersToRows = (
  members?: ClientOrganizationMember[],
  invitations?: ClientOrganizationInvitation[],
) => {
  console.log('members', members);
  console.log('invitations', invitations);
  const membersMap =
    members?.map((member) => ({
      id: member.id,
      email: member.email,
      active: true,
      createdAt: member.createdAtString,
      firstName: member.firstName,
      lastName: member.lastName,
    })) ?? [];

  const invitationsMap =
    invitations?.map((invitation) => ({
      id: invitation.id,
      email: invitation.inviteeEmail,
      active: false,
      createdAt: invitation.createdAtString,
      firstName: '',
      lastName: '',
    })) ?? [];

  const allMembers = [...membersMap, ...invitationsMap];

  const headers = [
    {
      name: 'Email',
      key: '1',
    },
    {
      name: 'Added',
      key: '2',
    },
    {
      name: 'Actions',
      key: '3',
    },
  ];

  const rows = allMembers?.map((member, idx) => ({
    key: member.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <div css={flex.display.inline}>
            <p>{member.email}</p>
            {!member.active && (
              <Badge
                color="note"
                style="outline"
                customCss={[spacing.left.small]}
              >
                Pending
              </Badge>
            )}
          </div>
        ),
      },
      {
        key: '2',
        component: (
          <p>
            {formatDistanceToNow(new Date(member.createdAt || ''), {
              addSuffix: true,
            })}
          </p>
        ),
      },
      {
        key: '3',
        component: (
          <div css={[flex.display.flex]}>
            <Button style="outline" size="small">
              Remove
            </Button>
          </div>
        ),
      },
    ],
  }));

  console.log('rows', rows);

  return {
    rows,
    headers,
  };
};
