import { Table, withQuery } from '@shared/index';
import { useEffect, useMemo, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import {
  getHandlerTableChange,
  useInvitations,
  useResendInvitation,
  OrganizationDialog,
  invitationAtoms,
} from '@modules/organization';
import {
  Action,
  Member,
} from '@modules/organization/utils/mapOrganizationMembersToRows';
import { InitialQueryParams } from '@modules/organization/ui/OrganizationMembersUIHelpers';
import { useOrganizationInvitationsUIContext } from '@modules/organization/ui/OrganizationInvitationsUIContext';
import { mapOrganizationInvitationsToRows } from '@modules/organization/utils/mapOrganizationInvitationsToRows';
import { useRecoilValue } from 'recoil';

export const OrganizationInvitations = () => {
  const organizationInvitationsUIContext =
    useOrganizationInvitationsUIContext();
  const organizationInvitationsUIProps = useMemo(() => {
    return {
      queryParams: organizationInvitationsUIContext.queryParams,
      setQueryParams: organizationInvitationsUIContext.setQueryParams,
    };
  }, [organizationInvitationsUIContext]);

  const { sentInvitations } = useInvitations();

  const sentInvitationsActive = useRecoilValue(
    invitationAtoms.sentInvitationsActive(
      organizationInvitationsUIProps.queryParams,
    ),
  );

  const { resendInvitation } = useResendInvitation();

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

  return (
    <section>
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
        <p css={spacing.top.medium}>No pending invitations</p>
      )}
    </section>
  );
};
