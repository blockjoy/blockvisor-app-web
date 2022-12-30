import { useGetOrganizationMembers } from "@modules/organizations/hooks/useGetMembers";
import { Button, Table } from "@shared/index";
import { useEffect } from "react";
import { flex } from "styles/utils.flex.styles";
import { spacing } from "styles/utils.spacing.styles";

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
            <Button
              style="outline"
              size="small"
            >
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
}

export const Members = ({ id }: MembersProps) => {
  const { getOrganizationMembers, organizationMembers, isLoading } = useGetOrganizationMembers();
  
  useEffect(() => {
    if (id) getOrganizationMembers(id);
  }, [id]);

  const rows = mapOrganizationMembersToRows(organizationMembers);
  
  return (
    <>
      <h2 css={[spacing.bottom.large]}>Members</h2>
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
      <div css={[spacing.top.large]} />
    </>
  )
}

export default Members;
