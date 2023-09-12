import { selector } from 'recoil';
import { Org, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationAtoms } from '@modules/organization';
import { authAtoms } from '@modules/auth';
// import { ORG_ROLES } from '@modules/auth/hooks/useHasPermissions';

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

const userRoleInOrganization = selector<any | null>({
  key: 'organization.user.role',
  get: ({ get }) => {
    const user = get(authAtoms.user);

    const defaultOrganizationDetails = get(defaultOrganization);

    // const role: any | null =
    //   defaultOrganizationDetails?.members?.find(
    //     (u: any) => u.userId === user?.id,
    //   )?.role ?? null;

    const role = null;

    return role;
  },
});

const userRoleNameInOrganization = selector<string>({
  key: 'organization.user.roleName',
  get: ({ get }) => {
    const orgRole = get(userRoleInOrganization);
    if (!orgRole) return '';

    return '';
  },
});

export const organizationSelectors = {
  defaultOrganization,

  userRoleInOrganization,
  userRoleNameInOrganization,
};
