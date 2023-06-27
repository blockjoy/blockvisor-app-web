import { Org, OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { selector } from 'recoil';
import { organizationAtoms } from './organizationAtoms';
import { getOrgMemberRole } from '../utils/getOrgMemberRole';
import { authAtoms } from '@modules/auth';

const userRoleInOrganization = selector<OrgRole>({
  key: 'organizations.user.role',
  get: ({ get }) => {
    const user = get(authAtoms.user);

    const defaultOrganization = get(organizationAtoms.defaultOrganization);

    const allOrgs = get(organizationAtoms.allOrganizations);

    const activeOrg =
      allOrgs.find(
        (organization: Org) => organization.id === defaultOrganization?.id,
      ) ?? null;

    const role = getOrgMemberRole(activeOrg!, user?.id!);

    return role;
  },
});

export const organizationSelectors: any = {
  userRoleInOrganization,
};
