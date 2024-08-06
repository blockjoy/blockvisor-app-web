import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { Table, TableAdd, withQuery } from '@shared/components';
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
import { useOrganizationInvitationsUIContext } from '@modules/organization/ui/OrganizationInvitationsUIContext';
import { mapOrganizationInvitationsToRows } from '@modules/organization/utils/mapOrganizationInvitationsToRows';
import { authSelectors } from '@modules/auth';
import { checkIfExists } from '@modules/organization/utils/checkIfExists';

export const OrganizationInvitations = () => {
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

  const sentInvitationsActive = useRecoilValue(
    invitationAtoms.sentInvitationsActive(
      organizationInvitationsUIProps.queryParams,
    ),
  );
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );
  const canCreateMember = useRecoilValue(
    authSelectors.hasPermission('invitation-create'),
  );

  const [isInviting, setIsInviting] = useState<boolean>(false);
  const [activeView, setActiveView] =
    useState<string | 'list' | 'invite'>('list');
  const [activeMember, setActiveMember] = useState<Member | null>(null);
  const [activeAction, setActiveAction] = useState<Action | null>(null);

  const { sentInvitations, getSentInvitations } = useInvitations();
  const { inviteMembers } = useInviteMembers();
  const { resendInvitation } = useResendInvitation();

  const members = selectedOrganization?.members;

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

  const InvitationsTable = withQuery({
    pagination: true,
  })(Table);

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
            queryParams={organizationInvitationsUIProps.queryParams}
            setQueryParams={organizationInvitationsUIProps.setQueryParams}
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
