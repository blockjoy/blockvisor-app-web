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

export const mapOrganizationMembersToRows = (
  organizationMembers?: ClientOrganizationMember[],
) => {
  return organizationMembers?.map((member, idx) => ({
    key: member.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{member.firstName}</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{member.lastName}</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>{member.email}</p>
          </>
        ),
      },
      // {
      //   key: '4',
      //   component: (
      //     <div css={[flex.display.flex]}>
      //       <Button style="outline" size="small">
      //         Remove
      //       </Button>
      //     </div>
      //   ),
      // },
    ],
  }));
};

export type MembersProps = {
  id?: string;
};

export const Members = ({ id }: MembersProps) => {
  const { inviteMembers } = useInviteMembers();
  const { getSentInvitations } = useInvitations();

  const { getOrganizationMembers, organizationMembers, isLoading } =
    useGetOrganizationMembers();

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
    console.log('emails', emails);
    inviteMembers(emails!, () => {
      setActiveView('list');
      getSentInvitations(id!);
    });
  };

  const handleAddMembersClicked = () => {
    setActiveView('invite');
  };

  useEffect(() => {
    if (id) getOrganizationMembers(id);
  }, [id]);

  const rows = mapOrganizationMembersToRows(organizationMembers);

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
      {activeView === 'list' && (
        <Table
          isLoading={isLoading}
          headers={[
            {
              name: 'First name',
              key: '1',
            },
            {
              name: 'Last name',
              key: '2',
            },
            {
              name: 'Email',
              key: '3',
            },
          ]}
          rows={rows}
        />
      )}
      <OrganizationPendingInvitations orgId={id!} />
    </>
  );
};

export default Members;
