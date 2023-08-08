import { Org, OrgRole, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';

export const getOrgMemberRole = (
  organization: Org,
  userId: string,
): OrgRole => {
  const role = organization?.members?.find((u: OrgUser) => u.userId === userId)
    ?.role!;
  return role;
};
