import { useIdentityRepository } from '@modules/auth';
import { Button, SvgIcon } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { organizationAtoms } from '../store/organizationAtoms';
import IconClose from '@public/assets/icons/common/Close.svg';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { getOrgMemberRole } from './getOrgMemberRole';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';

export enum Action {
  revoke = 'revoke',
  remove = 'remove ',
  resend = 'resend ',
}

export type Member = {
  userId?: string | undefined;
  orgId?: string | undefined;
  email?: string;
  invitationId?: string | undefined;
  isPending?: boolean;
};

export type Methods = {
  action: (action: Action, orgMember: Member) => void;
  reset: VoidFunction;
  resend: (orgMember: Member) => void;
};

export const mapOrganizationInvitationsToRows = (
  invitations?: Invitation[],
  methods?: Methods,
) => {
  const repository = useIdentityRepository();
  const identity = repository?.getIdentity();

  const userId = identity?.id;
  const userEmail = identity?.email;

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const canCreateMember: boolean = useHasPermissions(
    getOrgMemberRole(selectedOrganization!, userId!),
    Permissions.CREATE_MEMBER,
  );

  const canRemoveMember: boolean = useHasPermissions(
    getOrgMemberRole(selectedOrganization!, userId!),
    Permissions.DELETE_MEMBER,
  );

  const handleRemoveMember = async (
    userId: string,
    orgId: string,
    email: string,
  ) => {
    methods?.action(Action.remove, { userId, orgId, email });
  };

  const handleRevokeInvitation = (invitationId: string, email: string) => {
    methods?.action(Action.revoke, { invitationId, email });
  };

  const handleResendInvitation = (
    invitationId: string,
    email: string,
    orgId: string,
  ) => {
    methods?.resend({ invitationId, email, orgId });
  };

  const headers = [
    {
      name: 'Email',
      key: '1',
      width: '300px',
      minWidth: '300px',
      maxWidth: '300px',
      dataField: 'email',
      sort: true,
    },
    {
      name: '',
      key: '2',
      width: '60px',
      minWidth: '60px',
      maxWidth: '60px',
      textAlign: 'right',
    },
    {
      name: '',
      key: '3',
      width: '50px',
      minWidth: '50px',
      maxWidth: '50px',
      textAlign: 'right',
    },
  ];

  const rows = invitations?.map((invitation: Invitation, idx: number) => ({
    key: invitation.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: <p>{escapeHtml(invitation.inviteeEmail!)}</p>,
      },
      {
        key: '3',
        component: canCreateMember ? (
          <Button
            type="button"
            onClick={() =>
              handleResendInvitation(
                invitation.id!,
                invitation.inviteeEmail!,
                selectedOrganization?.id!,
              )
            }
            style="outline"
            size="small"
          >
            Resend
          </Button>
        ) : null,
      },
      {
        key: '4',
        component: (
          <>
            {canRemoveMember ? (
              <Button
                type="button"
                tooltip="Cancel"
                style="icon"
                size="medium"
                onClick={() =>
                  handleRevokeInvitation(
                    invitation?.id!,
                    invitation?.inviteeEmail!,
                  )
                }
              >
                <SvgIcon size="20px">
                  <IconClose />
                </SvgIcon>
              </Button>
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
