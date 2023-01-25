import { useGetOrganizationMembers } from '@modules/organization/hooks/useGetMembers';
import { Button, checkIfValidEmail, Table } from '@shared/index';
import { ChangeEvent, useEffect, useState } from 'react';
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

export type MembersProps = {
  members?: ClientOrganizationMember[];
  invitations?: ClientOrganizationInvitation[];
  id?: string;
};

export const Members = ({ members, invitations, id }: MembersProps) => {
  const { inviteMembers } = useInviteMembers();

  const { resendInvitation } = useResendInvitation();

  const { isLoading, pageIndex, setPageIndex } = useGetOrganizationMembers();

  // TOOD: remove after fixed bug in API (return org the invitation's id in response)
  const { getSentInvitations } = useInvitations();

  const [activeView, setActiveView] =
    useState<string | 'list' | 'invite'>('list');

  const [emails, setEmails] = useState<string[]>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const canCreateMember: boolean = useHasPermissions(
    selectedOrganization?.currentUser?.role!,
    Permissions.CREATE_MEMBER,
  );

  const handleTextareaChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const isValid = checkIfValidEmail(e.target.value);

    if (isValid) {
      setIsDisabled(false);
      setEmails([e.target.value]);
    } else {
      setIsDisabled(true);
    }
  };

  const handlePageClicked = (index: number) => {
    setPageIndex(index);
  };

  const handleInviteClicked = () => {
    const isMemberOrInvited = checkIfExists(members!, invitations!, emails![0]);

    if (!isMemberOrInvited) {
      inviteMembers(emails!, () => {
        getSentInvitations(id!);
        setActiveView('list');
        setPageIndex(0);
      });
    } else {
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
          hasTextareaValue={!isDisabled}
          onInviteClicked={handleInviteClicked}
          onCancelClicked={() => setActiveView('list')}
          onTextareaChanged={handleTextareaChanged}
        />
      )}
      <Table
        pageSize={8}
        pageIndex={pageIndex}
        onPageClicked={handlePageClicked}
        isLoading={isLoading}
        headers={headers}
        rows={rows}
        verticalAlign="middle"
        fixedRowHeight="74px"
        setPageIndex={setPageIndex}
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
