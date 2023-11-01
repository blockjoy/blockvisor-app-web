import {
  Table,
  TableAdd,
  getHandlerTableChange,
  withQuery,
} from '@shared/components';
import { useMemo, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import {
  useInvitations,
  useResendInvitation,
  OrganizationDialog,
  invitationAtoms,
  useInviteMembers,
  organizationAtoms,
} from '@modules/organization';
import {
  Action,
  Member,
} from '@modules/organization/utils/mapOrganizationMembersToRows';
import { InitialQueryParams } from '@modules/organization/ui/OrganizationMembersUIHelpers';
import { useOrganizationInvitationsUIContext } from '@modules/organization/ui/OrganizationInvitationsUIContext';
import { mapOrganizationInvitationsToRows } from '@modules/organization/utils/mapOrganizationInvitationsToRows';
import { useRecoilValue } from 'recoil';
import { usePermissions } from '@modules/auth';
import { checkIfExists } from '@modules/organization/utils/checkIfExists';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export const OrganizationInvitations = () => {
  const [isInviting, setIsInviting] = useState<boolean>(false);

  const router = useRouter();

  const { id } = router.query;

  const organizationInvitationsUIContext =
    useOrganizationInvitationsUIContext();
  const organizationInvitationsUIProps = useMemo(() => {
    return {
      queryParams: organizationInvitationsUIContext.queryParams,
      setQueryParams: organizationInvitationsUIContext.setQueryParams,
    };
  }, [organizationInvitationsUIContext]);

  const { sentInvitations, getSentInvitations } = useInvitations();

  const sentInvitationsActive = useRecoilValue(
    invitationAtoms.sentInvitationsActive(
      organizationInvitationsUIProps.queryParams,
    ),
  );

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const members = selectedOrganization?.members;

  const { inviteMembers } = useInviteMembers();

  const handleInviteClicked = async (email: string) => {
    setIsInviting(true);

    const isMemberOrInvited = checkIfExists(
      members!,
      sentInvitations!,
      email!?.toLowerCase(),
    );

    if (!isMemberOrInvited) {
      await inviteMembers(email!, () => {
        getSentInvitations(id!);
        setIsInviting(false);
      });
    } else {
      setIsInviting(false);
      if (isMemberOrInvited === 'member') {
        toast.error('Already a member');
      } else {
        toast.error('Already invited');
      }
    }

    return true;
  };

  const { resendInvitation } = useResendInvitation();
  const { hasPermission } = usePermissions();

  const [activeView, setActiveView] =
    useState<string | 'list' | 'invite'>('list');

  const [activeMember, setActiveMember] = useState<Member | null>(null);
  const [activeAction, setActiveAction] = useState<Action | null>(null);

  const methods = {
    action: (action: Action, orgMember: Member) => {
      setActiveView('action');
      setActiveAction(action);
      setActiveMember(orgMember);
    },
    reset: () => {
      setActiveView('list');
      setActiveAction(null);
      setActiveMember(null);
    },
    resend: (orgMember: Member) =>
      resendInvitation(orgMember.email!, orgMember.invitationId!),
  };

  const { headers, rows } = mapOrganizationInvitationsToRows(
    sentInvitationsActive,
    methods,
  );

  const handleTableChange = (type: string, queryParams: InitialQueryParams) => {
    getHandlerTableChange(organizationInvitationsUIProps.setQueryParams)(
      type,
      queryParams,
    );
  };

  const InvitationsTable = withQuery(Table);

  const canCreateMember = hasPermission('invitation-create');

  return (
    <section>
      {canCreateMember && (
        <TableAdd
          buttonText="Invite"
          buttonWidth="70px"
          placeholder="Invite Member"
          placeholderFocused="Enter an email address"
          onSubmit={async (email: string) => await handleInviteClicked(email)}
          isLoading={isInviting}
          isEmail
        />
      )}
      {sentInvitations?.length ? (
        <>
          <InvitationsTable
            hideHeader
            headers={headers}
            rows={rows}
            verticalAlign="middle"
            fixedRowHeight="74px"
            total={sentInvitations?.length}
            properties={organizationInvitationsUIProps.queryParams}
            onTableChange={handleTableChange}
          />
          {activeView === 'action' && (
            <OrganizationDialog
              activeMember={activeMember!}
              activeAction={activeAction!}
              onHide={methods.reset}
            />
          )}
        </>
      ) : (
        <p css={spacing.top.medium}>No invitations</p>
      )}
    </section>
  );
};
