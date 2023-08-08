import { useIdentity } from '@modules/auth';
import { Button, SvgIcon } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import IconClose from '@public/assets/icons/common/Close.svg';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { getOrgMemberRole } from './getOrgMemberRole';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';
import { OrganizationInvitationsResend } from '@modules/organization';

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
};

export const mapOrganizationInvitationsToRows = (
  invitations?: Invitation[],
  methods?: Methods,
) => {
  const { user } = useIdentity();

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const role = getOrgMemberRole(selectedOrganization!, user?.id!);

  const canCreateMember: boolean = useHasPermissions(
    user?.role,
    role,
    Permissions.CREATE_MEMBER,
  );

  const canRemoveMember: boolean = useHasPermissions(
    user?.role,
    role,
    Permissions.DELETE_MEMBER,
  );

  const handleRevokeInvitation = (invitationId: string, email: string) => {
    methods?.action(Action.revoke, { invitationId, email });
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
      width: '100px',
      minWidth: '100px',
      maxWidth: '100px',
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
          <OrganizationInvitationsResend invitation={invitation} />
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
