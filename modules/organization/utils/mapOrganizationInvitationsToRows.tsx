import { useRecoilValue } from 'recoil';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';
import { authSelectors } from '@modules/auth';
import { Button, SvgIcon } from '@shared/components';
import IconClose from '@public/assets/icons/common/Close.svg';
import { escapeHtml } from '@shared/utils/escapeHtml';
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
  const canCreateMember = useRecoilValue(
    authSelectors.hasPermission('invitation-create'),
  );
  const canRemoveMember = useRecoilValue(
    authSelectors.hasPermission('org-remove-member'),
  );

  const handleRevokeInvitation = (invitationId: string, email: string) => {
    methods?.action(Action.revoke, { invitationId, email });
  };

  const headers: TableHeader[] = [
    {
      name: 'Email',
      key: '1',
      width: '300px',
      minWidth: '300px',
      maxWidth: '300px',
      dataField: 'email',
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
    key: invitation.invitationId ?? `${idx}`,
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
        component: canRemoveMember ? (
          <Button
            type="button"
            tooltip="Cancel"
            style="icon"
            size="medium"
            onClick={() =>
              handleRevokeInvitation(
                invitation?.invitationId!,
                invitation?.inviteeEmail!,
              )
            }
          >
            <SvgIcon size="20px">
              <IconClose />
            </SvgIcon>
          </Button>
        ) : null,
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
