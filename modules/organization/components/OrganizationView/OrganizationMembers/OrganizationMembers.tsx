import { useGetOrganizationMembers } from '@modules/organization/hooks/useGetMembers';
import { Button, Table } from '@shared/index';
import { ChangeEvent, useEffect, useState } from 'react';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import PersonIcon from '@public/assets/icons/person-12.svg';
import { styles } from './OrganizationMembers.styles';
import { OrganizationInvite } from './OrganizationInvite/OrganizationInvite';
import { useInviteMembers } from '@modules/organization/hooks/useInviteMembers';
import { OrganizationPendingInvitations } from './OrganizationPendingInvitations/OrganizationPendingInvitations';
import { useInvitations } from '@modules/organization';
import { mapOrganizationMembersToRows } from '@modules/organization/utils/mapOrganizationMembersToRows';

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

  const handleTextareaChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) {
      setEmails([]);
      return;
    }

    var arrayOfLines = e.target.value.split('\n');
    setEmails(arrayOfLines);
  };

  const handleInviteClicked = () => {
    inviteMembers(emails!, () => {
      getSentInvitations(id!);
      setActiveView('list');
    });
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
            Add Members
          </Button>
        )}
      </h2>
      {activeView === 'invite' && (
        <OrganizationInvite
          hasTextareaValue={Boolean(emails?.length)}
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
