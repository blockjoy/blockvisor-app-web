<<<<<<< HEAD
import { selector } from 'recoil';
import { Org, OrgRole, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationAtoms } from '@modules/organization';
import { authAtoms } from '@modules/auth';
import { ORG_ROLES } from '@modules/auth/hooks/useHasPermissions';

const defaultOrganization = selector<Org | null>({
  key: 'organization.default.details',
  get: ({ get }) => {
    const defaultOrganizationIdentity = get(
      organizationAtoms.defaultOrganization,
    );
    const allOrgs = get(organizationAtoms.allOrganizations);

    const activeOrg =
      allOrgs?.find(
        (organization: Org) =>
          organization.id === defaultOrganizationIdentity?.id,
      ) ?? null;

    return activeOrg;
=======
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
>>>>>>> df91c2f2 (feat: sc-1581 node creation permissions; sc-1099 add/remove items from subscription; sc-1116 subscription customer upon node creationg)
  },
});

const userRoleInOrganization = selector<OrgRole | null>({
  key: 'organization.user.role',
  get: ({ get }) => {
    const user = get(authAtoms.user);

    const defaultOrganizationDetails = get(defaultOrganization);

    const role: OrgRole | null =
      defaultOrganizationDetails?.members?.find(
        (u: OrgUser) => u.userId === user?.id,
      )?.role ?? null;

    return role;
  },
});

const userRoleNameInOrganization = selector<string>({
  key: 'organization.user.roleName',
  get: ({ get }) => {
    const orgRole = get(userRoleInOrganization);
    if (!orgRole) return '';

    return ORG_ROLES[orgRole];
  },
});

export const organizationSelectors = {
  defaultOrganization,

  userRoleInOrganization,
  userRoleNameInOrganization,
};
