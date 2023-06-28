import { useMemo, useState } from 'react';
import {
  getHandlerTableChange,
  organizationAtoms,
  useResendInvitation,
  OrganizationDialog,
} from '@modules/organization';
import {
  Action,
  mapOrganizationMembersToRows,
  Member,
} from '@modules/organization/utils/mapOrganizationMembersToRows';
import { useRecoilValue } from 'recoil';
import { Table, withQuery } from '@shared/components';
import { InitialQueryParams } from '@modules/organization/ui/OrganizationMembersUIHelpers';
import { useOrganizationMembersUIContext } from '@modules/organization/ui/OrganizationMembersUIContext';

export const OrganizationMembers = () => {
  const OrganizationMembersUIContext = useOrganizationMembersUIContext();
  const organizationMembersUIProps = useMemo(() => {
    return {
      queryParams: OrganizationMembersUIContext.queryParams,
      setQueryParams: OrganizationMembersUIContext.setQueryParams,
    };
  }, [OrganizationMembersUIContext]);

  const members = useRecoilValue(
    organizationAtoms.organizationMembersActive(
      organizationMembersUIProps.queryParams,
    ),
  );

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const { resendInvitation } = useResendInvitation();

  // TOOD: remove after fixed bug in API (return org the invitation's id in response)

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

  const handleTableChange = (type: string, queryParams: InitialQueryParams) => {
    getHandlerTableChange(organizationMembersUIProps.setQueryParams)(
      type,
      queryParams,
    );
  };

  const MembersTable = withQuery(Table);

  return (
    <section>
      <MembersTable
        hideHeader
        headers={headers}
        rows={rows}
        verticalAlign="middle"
        fixedRowHeight="74px"
        total={selectedOrganization?.memberCount!}
        properties={organizationMembersUIProps.queryParams}
        onTableChange={handleTableChange}
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
