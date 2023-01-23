import { useIdentityRepository } from '@modules/auth';
import { Badge, Button } from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useRemoveMember } from '../hooks/useRemoveMember';
import { organizationAtoms } from '../store/organizationAtoms';
import IconClose from '@public/assets/icons/burger-hide.svg';

export enum Action {
  revoke = 'revoke',
  remove = 'remove ',
  resend = 'resend ',
}

export type Member = {
  user_id?: string | undefined;
  org_id?: string | undefined;
  email?: string;
  invitation_id?: string | undefined;
  isPending?: boolean;
};

export type Methods = {
  action: (action: Action, orgMember: Member) => void;
  reset: VoidFunction;
  resend: (orgMember: Member) => void;
};

export const mapOrganizationMembersToRows = (
  members?: ClientOrganizationMember[],
  invitations?: ClientOrganizationInvitation[],
  methods?: Methods,
) => {
  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const membersMap =
    members?.map((member) => ({
      id: member.id,
      email: member.email,
      active: true,
      createdAt: member.createdAtString,
      firstName: member.firstName,
      lastName: member.lastName,
      invitationId: null,
      isPending: false,
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
      isPending: true,
    })) ?? [];

  const allMembers = [...membersMap, ...invitationsMap];

  const handleRemoveMember = async (
    user_id: string,
    org_id: string,
    email: string,
  ) => {
    methods?.action(Action.remove, { user_id, org_id, email });
  };

  const handleRevokeInvitation = (invitation_id: string, email: string) => {
    methods?.action(Action.revoke, { invitation_id, email });
  };

  const handleResendInvitation = (
    invitation_id: string,
    email: string,
    org_id: string,
  ) => {
    methods?.resend({ invitation_id, email, org_id });
  };

  const headers = [
    {
      name: 'Email',
      key: '1',
      width: '40%',
    },
    {
      name: 'Added',
      key: '2',
      width: '55%',
    },
    {
      name: '',
      key: '3',
      width: '10%',
    },
    {
      name: '',
      key: '4',
      width: '5%',
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
        component: !member.createdAt ? <Button>Resend</Button> : null,
      },
      {
        key: '4',
        component: (
          <>
            {member.active ? (
              member.id !== userId && (
                <Button
                  type="button"
                  tooltip="Remove"
                  style="icon"
                  size="medium"
                  onClick={() =>
                    handleRemoveMember(
                      member?.id!,
                      selectedOrganization?.id!,
                      member?.email!,
                    )
                  }
                >
                  <IconClose />
                </Button>
              )
            ) : (
              <Button
                type="button"
                tooltip="Revoke"
                style="icon"
                size="medium"
                onClick={() =>
                  handleRevokeInvitation(member?.invitationId!, member?.email!)
                }
              >
                <IconClose />
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
