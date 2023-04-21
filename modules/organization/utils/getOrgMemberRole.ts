import { Org, OrgUser } from '@modules/grpc/library/organization';

export const getOrgMemberRole = (organization: Org, userId: string) => {
  const role = organization?.members.find((u: OrgUser) => u.userId === userId)
    ?.role!;
  return role;
};
