import { useIdentityRepository } from '@modules/auth';
import { Badge, Button } from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { useRecoilValue, useRecoilState } from 'recoil';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useInvitations } from '../hooks/useInvitations';
import { useRemoveMember } from '../hooks/useRemoveMember';
import { organizationAtoms } from '../store/organizationAtoms';

export const mapOrganizationMembersToRows = (
  members?: ClientOrganizationMember[],
  invitations?: ClientOrganizationInvitation[],
) => {
  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );
  const [sentInvitations, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );

  const { removeMemberFromOrganization } = useRemoveMember();
  const { revokeInvitation } = useInvitations();

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
      invitationId: null,
    })) ?? [];

  const invitationsMap =
    invitations?.map((invitation) => ({
      id: null,
      email: invitation.inviteeEmail,
      active: false,
      createdAt: invitation.createdAtString,
      firstName: '',
      lastName: '',
      invitationId: invitation.id,
    })) ?? [];

  const allMembers = [...membersMap, ...invitationsMap];

  const handleRemoveMember = async (user_id: string, org_id: string) => {
    await removeMemberFromOrganization(user_id, org_id);
  };

  const handleRevokeInvitation = async (
    invitation_id: string,
    email: string,
  ) => {
    await revokeInvitation({ invitationId: invitation_id, email }, () =>
      updateInvitations(invitation_id),
    );
  };

  const updateInvitations = (invitation_id: string) => {
    const newSentInvitations = sentInvitations.filter(
      (invitation) => invitation.id !== invitation_id,
    );
    setSentInvitations(newSentInvitations);
  };

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
            {member.active ? (
              member.id !== userId && (
                <Button
                  style="basic"
                  size="medium"
                  onClick={() =>
                    handleRemoveMember(member?.id!, selectedOrganization?.id!)
                  }
                >
                  X
                </Button>
              )
            ) : (
              <Button
                style="basic"
                size="medium"
                onClick={() =>
                  handleRevokeInvitation(member?.invitationId!, member?.email!)
                }
              >
                X
              </Button>
            )}
          </div>
        ),
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
