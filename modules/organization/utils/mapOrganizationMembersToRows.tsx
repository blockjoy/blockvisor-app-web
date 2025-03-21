import { useRecoilValue } from 'recoil';
import { useIdentity, authSelectors } from '@modules/auth';
import { Badge, Button, SvgIcon } from '@shared/components';
import { flex } from 'styles/utils.flex.styles';
import { organizationAtoms } from '../store/organizationAtoms';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { OrgUser } from '@modules/grpc/library/blockjoy/v1/org';
import { spacing } from 'styles/utils.spacing.styles';
import { getOrganizationRole } from './getOrganizationRole';

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
  const { user } = useIdentity();

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const canRemoveMember = useRecoilValue(
    authSelectors.hasPermission('org-remove-member'),
  );

  const handleRemoveMember = async (
    userId: string,
    orgId: string,
    email: string,
  ) => {
    methods?.action(Action.remove, { userId, orgId, email });
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
      width: '50px',
      minWidth: '50px',
      maxWidth: '50px',
      textAlign: 'right',
    },
  ];

  const rows = members?.map((member: OrgUser, idx: number) => {
    const role = getOrganizationRole(member.roles);

    return {
      key: member.userId ?? `${idx}`,
      cells: [
        {
          key: '1',
          component: (
            <div css={[flex.display.inline, flex.align.center]}>
              <p>{escapeHtml(member.email!)}</p>
              {role === 'Owner' ? (
                <Badge style="outline" customCss={[spacing.left.small]}>
                  Owner
                </Badge>
              ) : (
                role === 'Admin' && (
                  <Badge style="outline" customCss={[spacing.left.small]}>
                    Admin
                  </Badge>
                )
              )}
            </div>
          ),
        },
        {
          key: '2',
          component: (
            <>
              {canRemoveMember && member.userId !== user?.userId ? (
                <Button
                  className="show-on-hover"
                  type="button"
                  tooltip="Remove"
                  style="icon"
                  size="medium"
                  onClick={() =>
                    handleRemoveMember(
                      member?.userId!,
                      selectedOrganization?.orgId!,
                      member?.email!,
                    )
                  }
                >
                  <SvgIcon size="18px">
                    <IconDelete />
                  </SvgIcon>
                </Button>
              ) : null}
            </>
          ),
        },
      ],
    };
  });

  return {
    rows,
    headers,
  };
};
