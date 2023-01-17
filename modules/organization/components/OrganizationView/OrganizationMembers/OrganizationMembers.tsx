import { useGetOrganizationMembers } from '@modules/organization/hooks/useGetMembers';
import { Button, isValidEmail, Table } from '@shared/index';
import { ChangeEvent, useEffect, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationMembers.styles';
import { OrganizationInvite } from './OrganizationInvite/OrganizationInvite';
import { useInviteMembers } from '@modules/organization/hooks/useInviteMembers';
import { OrganizationPendingInvitations } from './OrganizationPendingInvitations/OrganizationPendingInvitations';
import { useInvitations } from '@modules/organization';
import { mapOrganizationMembersToRows } from '@modules/organization/utils/mapOrganizationMembersToRows';
import PersonIcon from '@public/assets/icons/person-12.svg';
import { toast } from 'react-toastify';
import { checkIfExists } from '@modules/organization/utils/checkIfExists';

export type MembersProps = {
  id?: string;
};

export const Members = ({ id }: MembersProps) => {
  const { inviteMembers } = useInviteMembers();

  const { getOrganizationMembers, organizationMembers, isLoading } =
    useGetOrganizationMembers();

  const { getSentInvitations, sentInvitations } = useInvitations();

  const [activeView, setActiveView] =
    useState<string | 'list' | 'invite'>('list');

  const [emails, setEmails] = useState<string[]>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleTextareaChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidEmail(e.target.value);

    if (isValid) {
      setIsDisabled(false);
      setEmails([e.target.value]);
    } else {
      setIsDisabled(true);
    }
  };

  const handleInviteClicked = () => {
    const isMemberOrInvited = checkIfExists(organizationMembers, sentInvitations, emails![0]);

    if (!isMemberOrInvited) {
      inviteMembers(emails!, () => {
        getSentInvitations(id!);
        setActiveView('list');
      });
    } else {
      if (isMemberOrInvited === 'member') {
        toast.error('Already a member')
      } else {
        toast.error('Already invited')
      }
    }
  };

  const handleAddMembersClicked = () => {
    setActiveView('invite');
  };

  useEffect(() => {
    if (id) {
      getOrganizationMembers(id);
      getSentInvitations(id);
    }
  }, [id]);

  const { headers, rows } = mapOrganizationMembersToRows(
    organizationMembers,
    sentInvitations,
  );

  return (
    <>
      <h2 css={[styles.h2, spacing.bottom.large]}>
        Members
        {activeView === 'list' && (
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
        isLoading={isLoading}
        headers={headers}
        rows={rows}
        verticalAlign="middle"
      />
    </>
  );
};

export default Members;
