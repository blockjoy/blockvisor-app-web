import { useIdentityRepository } from '@modules/auth';
import { Badge, Button } from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { organizationAtoms } from '../store/organizationAtoms';
import IconClose from '@public/assets/icons/close-12.svg';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';

export enum Action {
  revoke = 'revoke',
  remove = 'remove ',
  resend = 'resend ',
}

type MemberListItem = {
  id?: string | null;
  email?: string;
  createdAt?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  invitationId?: string | null;
  isPending?: boolean;
};

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

  const canCreateMember: boolean = useHasPermissions(
    selectedOrganization?.currentUser?.role!,
    Permissions.CREATE_MEMBER,
  );
  const canRemoveMember: boolean = useHasPermissions(
    selectedOrganization?.currentUser?.role!,
    Permissions.DELETE_MEMBER,
  );

  const membersMap: MemberListItem[] =
    members?.map((member: ClientOrganizationMember) => ({
      id: member.id,
      email: member.email,
      createdAt: null,
      firstName: member.firstName,
      lastName: member.lastName,
      invitationId: null,
      isPending: false,
    })) ?? [];

  const invitationsMap: MemberListItem[] =
    invitations?.map((invitation: ClientOrganizationInvitation) => ({
      id: null,
      email: invitation.inviteeEmail,
      createdAt: null,
      firstName: null,
      lastName: null,
      invitationId: invitation.id,
      isPending: true,
    })) ?? [];

  const allMembers: MemberListItem[] = [...membersMap, ...invitationsMap];

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
    // {
    //   name: 'Joined',
    //   key: '2',
    //   width: '55%',
    // },
    {
      name: '',
      key: '3',
      width: '10%',
      textAlign: 'right',
    },
    {
      name: '',
      key: '4',
      width: '5%',
      textAlign: 'right',
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
            {member.isPending && (
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
      // {
      //   key: '2',
      //   component: (
      //     <>
      //       {member.createdAt && (
      //         <p>
      //           {formatDistanceToNow(new Date(member.createdAt || ''), {
      //             addSuffix: true,
      //           })}
      //         </p>
      //       )}
      //     </>
      //   ),
      // },
      {
        key: '3',
        component:
          member.isPending && canCreateMember ? (
            <span
              css={spacing.right.medium}
              style={{ textAlign: 'right', width: '100%', display: 'block' }}
            >
              <Button
                type="button"
                onClick={() =>
                  handleResendInvitation(
                    member.invitationId!,
                    member.email!,
                    selectedOrganization?.id!,
                  )
                }
                style="outline"
                size="small"
              >
                Resend
              </Button>
            </span>
          ) : null,
      },
      {
        key: '4',
        component: (
          <>
            {canRemoveMember ? (
              !member.isPending ? (
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
                  tooltip="Cancel"
                  style="icon"
                  size="medium"
                  onClick={() =>
                    handleRevokeInvitation(
                      member?.invitationId!,
                      member?.email!,
                    )
                  }
                >
                  <IconClose />
                </Button>
              )
            ) : null}
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
