import { useIdentityRepository } from '@modules/auth';
import { Badge, Button } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { organizationAtoms } from '../store/organizationAtoms';
import IconClose from '@public/assets/icons/close-12.svg';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';
import { MemberAndInvitation } from './mapMembersAndInvitations';

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
  membersAndInvitations?: any,
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

  const allMembers = membersAndInvitations.map((mi: any) => ({
    id: mi.email ? mi.id : null,
    email: mi.email ? mi.email : mi.inviteeEmail,
    createdAt: null,
    firstName: mi.firstName ? mi.firstName : null,
    lastName: mi.lastName ? mi.lastName : null,
    isPending: mi.inviteeEmail ? true : false,
    invitationId: mi.inviteeEmail ? mi.id : null,
  }));

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
      name: '',
      key: '2',
      width: '10%',
      textAlign: 'right',
    },
    {
      name: '',
      key: '3',
      width: '5%',
      textAlign: 'right',
    },
  ];

  const rows = allMembers?.map((member: MemberAndInvitation, idx: string) => ({
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
      {
        key: '2',
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
        key: '3',
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
