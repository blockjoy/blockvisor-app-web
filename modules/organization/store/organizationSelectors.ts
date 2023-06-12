import { Org, OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { selectorFamily } from 'recoil';
import { organizationAtoms } from './organizationAtoms';
import { getOrgMemberRole } from '../utils/getOrgMemberRole';

const userRoleInOrganization = selectorFamily<OrgRole, string>({
  key: 'organizations.user.role',
  get:
    (userId: string) =>
    ({ get }) => {
      const defaultOrganization = get(organizationAtoms.defaultOrganization);
      const allOrgs = get(organizationAtoms.allOrganizations);

      const activeOrg =
        allOrgs.find(
          (organization: Org) => organization.id === defaultOrganization?.id,
        ) ?? null;

      const role = getOrgMemberRole(activeOrg!, userId);

      return role;
    },
});

export const organizationSelectors: any = {
  userRoleInOrganization,
};
