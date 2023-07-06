import { useIdentityRepository } from '@modules/auth';
import { Badge, Button, SvgIcon } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { organizationAtoms } from '../store/organizationAtoms';
import IconClose from '@public/assets/icons/common/Close.svg';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { getOrgMemberRole } from './getOrgMemberRole';
import { OrgRole, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';

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

export const mapOrganizationMembersToRows = (
  members?: OrgUser[],
  methods?: Methods,
) => {
  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
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
      key: '3',
      width: '50px',
      minWidth: '50px',
      maxWidth: '50px',
      textAlign: 'right',
    },
  ];

  const rows = members?.map((member: OrgUser, idx: number) => ({
    key: member.userId ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <div css={[flex.display.inline, flex.align.center]}>
            <p>{escapeHtml(member.email!)}</p>
            {member.role === OrgRole.ORG_ROLE_OWNER && (
              <Badge style="outline" customCss={[spacing.left.small]}>
                Owner
              </Badge>
            )}
            {member.role === OrgRole.ORG_ROLE_ADMIN && (
              <Badge
                color="primary"
                style="outline"
                customCss={[spacing.left.small]}
              >
                Admin
              </Badge>
            )}
          </div>
        ),
      },
      {
        key: '2',
        component: (
          <>
            {canRemoveMember && member.userId !== userId ? (
              <Button
                type="button"
                tooltip="Remove"
                style="icon"
                size="medium"
                onClick={() =>
                  handleRemoveMember(
                    member?.userId!,
                    selectedOrganization?.id!,
                    member?.email!,
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
