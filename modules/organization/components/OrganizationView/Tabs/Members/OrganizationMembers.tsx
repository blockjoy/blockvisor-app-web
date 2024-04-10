import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  organizationAtoms,
  useResendInvitation,
  OrganizationDialog,
  organizationSelectors,
} from '@modules/organization';
import {
  Action,
  mapOrganizationMembersToRows,
  Member,
} from '@modules/organization/utils/mapOrganizationMembersToRows';
import { Table, withQuery } from '@shared/components';
import { useOrganizationMembersUIContext } from '@modules/organization/ui/OrganizationMembersUIContext';

export const OrganizationMembers = () => {
  const organizationMembersUIContext = useOrganizationMembersUIContext();
  const organizationMembersUIProps = useMemo(() => {
    return {
      queryParams: organizationMembersUIContext.queryParams,
      setQueryParams: organizationMembersUIContext.setQueryParams,
    };
  }, [organizationMembersUIContext]);

  const members = useRecoilValue(
    organizationSelectors.organizationMembersActive(
      organizationMembersUIProps.queryParams,
    ),
  );

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
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

  const { headers, rows } = mapOrganizationMembersToRows(members, methods);

  const MembersTable = withQuery({
    pagination: true,
  })(Table);

  // reset currentPage to first page, when org ID changes
  useEffect(() => {
    organizationMembersUIProps.setQueryParams({
      ...organizationMembersUIContext.queryParams,
      pagination: {
        ...organizationMembersUIContext.queryParams.pagination,
        currentPage: 1,
      },
    });
  }, [selectedOrganization?.id]);

  return (
    <section>
      <MembersTable
        hideHeader
        headers={headers}
        rows={rows}
        verticalAlign="middle"
        fixedRowHeight="74px"
        total={selectedOrganization?.memberCount!}
        queryParams={organizationMembersUIProps.queryParams}
        setQueryParams={organizationMembersUIProps.setQueryParams}
      />
      {activeView === 'action' && (
        <OrganizationDialog
          activeMember={activeMember!}
          activeAction={activeAction!}
          onHide={methods.reset}
        />
      )}
    </section>
  );
};
