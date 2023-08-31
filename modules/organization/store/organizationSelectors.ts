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

const isOwner = selector<boolean>({
  key: 'organization.user.isOwner',
  get: ({ get }) => {
    const role = get(userRoleInOrganization);

    return role === OrgRole.ORG_ROLE_OWNER;
  },
});

export const organizationSelectors = {
  defaultOrganization,

  userRoleInOrganization,
  userRoleNameInOrganization,

  isOwner,
};
