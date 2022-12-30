import { useGetOrganizationMembers } from '@modules/organization/hooks/useGetMembers';
import { Button, Table } from '@shared/index';
import { ChangeEvent, useEffect, useState } from 'react';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import PersonIcon from '@public/assets/icons/person-12.svg';
import { styles } from './OrganizationMembers.styles';
import { OrganizationInvite } from './OrganizationInvite/OrganizationInvite';

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
      {
        key: '4',
        component: (
          <div css={[flex.display.flex]}>
            <Button style="outline" size="small">
              Remove
            </Button>
          </div>
        ),
      },
    ],
  }));
};

export type MembersProps = {
  id?: string;
};

export const Members = ({ id }: MembersProps) => {
  const { getOrganizationMembers, organizationMembers, isLoading } =
    useGetOrganizationMembers();

  const [activeView, setActiveView] =
    useState<string | 'list' | 'invite'>('list');

  const [emails, setEmails] = useState<string[]>();

  const handleTextareaChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    var arrayOfLines = e.target.value.split('\n');
    setEmails(arrayOfLines);
  };

  const handleInviteClicked = () => {
    console.log('emails', emails);
  };

  useEffect(() => {
    if (id) getOrganizationMembers(id);
  }, [id]);

  const rows = mapOrganizationMembersToRows(organizationMembers);

  return (
    <>
      <h2 css={[styles.h2, spacing.bottom.large]}>
        Members
        <Button
          onClick={() => setActiveView('invite')}
          style="outline"
          size="small"
        >
          <PersonIcon />
          Add Members
        </Button>
      </h2>
      {activeView === 'invite' && (
        <OrganizationInvite
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
    </>
  );
};

export default Members;
