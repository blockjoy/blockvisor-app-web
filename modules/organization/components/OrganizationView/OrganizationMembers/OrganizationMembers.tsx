import { useGetOrganizationMembers } from '@modules/organization/hooks/useGetMembers';
import { Button, Table } from '@shared/index';
import { ChangeEvent, useState, useMemo } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationMembers.styles';
import { OrganizationInvite } from './OrganizationInvite/OrganizationInvite';
import { useInviteMembers } from '@modules/organization/hooks/useInviteMembers';
import {
  organizationAtoms,
  useInvitations,
  useResendInvitation,
} from '@modules/organization';
import {
  Action,
  mapOrganizationMembersToRows,
  Member,
} from '@modules/organization/utils/mapOrganizationMembersToRows';
import PersonIcon from '@public/assets/icons/person-12.svg';
import { toast } from 'react-toastify';
import { checkIfExists } from '@modules/organization/utils/checkIfExists';
import { OrganizationDialog } from './OrganizationDialog/OrganizationDialog';
import { useRecoilValue } from 'recoil';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';
import { withQuery } from '@shared/components/Table/utils/withQuery';
import { InitialQueryParams } from '@modules/organization/ui/OrganizationMembersUIHelpers';
import { useOrganizationMembersUIContext } from '@modules/organization/ui/OrganizationMembersUIContext';
import { useRouter } from 'next/router';

export const Members = () => {
  const router = useRouter();
  const { id } = router.query;

  const OrganizationMembersUIContext = useOrganizationMembersUIContext();
  const organizationMembersUIProps = useMemo(() => {
    return {
      queryParams: OrganizationMembersUIContext.queryParams,
      setQueryParams: OrganizationMembersUIContext.setQueryParams,
    };
  }, [OrganizationMembersUIContext]);

  const membersAndInvitations = useRecoilValue(
    organizationAtoms.organizationMembersAndInvitations(
      organizationMembersUIProps.queryParams,
    ),
  );

  const membersAndInvitationsActiveCount = useRecoilValue(
    organizationAtoms.organizationMembersAndInvitationsFiltered(
      organizationMembersUIProps.queryParams,
    ),
  ).length;

export type MembersProps = {
  members?: ClientOrganizationMember[];
  invitations?: ClientOrganizationInvitation[];
  id?: string;
};

export const Members = ({ members, invitations, id }: MembersProps) => {
  const { inviteMembers } = useInviteMembers();

  const { resendInvitation } = useResendInvitation();

  const { isLoading } = useGetOrganizationMembers();

  // TOOD: remove after fixed bug in API (return org the invitation's id in response)
  const { getSentInvitations } = useInvitations();

  const [activeView, setActiveView] =
    useState<string | 'list' | 'invite'>('list');

  const [inviteeEmail, setInviteeEmail] = useState<string>();
  const [isInviting, setIsInviting] = useState<boolean>(false);

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const canCreateMember: boolean = useHasPermissions(
    selectedOrganization?.currentUser?.role!,
    Permissions.CREATE_MEMBER,
  );

  const handleInviteeEmailChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteeEmail(e.target.value);
  };

  const handleInviteClicked = () => {
    setIsInviting(true);

    const isMemberOrInvited = checkIfExists(
      members!,
      invitations!,
      email!?.toLowerCase(),
    );

    if (!isMemberOrInvited) {
      inviteMembers(email!, () => {
        getSentInvitations(id!);
        setActiveView('list');
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
  };

  const handleAddMembersClicked = () => {
    setActiveView('invite');
  };

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
      resendInvitation(orgMember.email!, orgMember.invitation_id!),
  };

  const { headers, rows } = mapOrganizationMembersToRows(
    members,
    invitations,
    methods,
  );

  const handleTableChange = (type: string, queryParams: InitialQueryParams) => {
    getHandlerTableChange(organizationMembersUIProps.setQueryParams)(
      type,
      queryParams,
    );
  };

  const MembersTable = withQuery(Table);

  return (
    <>
      <h2 css={[styles.h2, spacing.bottom.large]}>
        Members
        {activeView === 'list' &&
          canCreateMember &&
          !selectedOrganization?.personal && (
            <Button
              onClick={handleAddMembersClicked}
              style="outline"
              size="small"
            >
              <PersonIcon />
              Add Member
            </Button>
          )}
      </h2>
      {activeView === 'invite' && (
        <OrganizationInvite
          isInviting={isInviting}
          onInviteClicked={handleInviteClicked}
          onCancelClicked={() => setActiveView('list')}
        />
      )}
      <Table
        isLoading={isLoading}
        headers={headers}
        rows={rows}
        verticalAlign="middle"
        fixedRowHeight="74px"
      />
      {activeView === 'action' && (
        <OrganizationDialog
          activeMember={activeMember!}
          activeAction={activeAction!}
          onHide={methods.reset}
        />
      )}
    </>
  );
};

export default Members;
