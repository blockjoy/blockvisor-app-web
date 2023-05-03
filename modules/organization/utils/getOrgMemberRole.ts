import { Org, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';

export const getOrgMemberRole = (organization: Org, userId: string) => {
  const role = organization?.members.find((u: OrgUser) => u.userId === userId)
    ?.role!;
  return role;
};
