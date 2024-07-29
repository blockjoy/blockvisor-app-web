import { selector, selectorFamily } from 'recoil';
import { Org, OrgRole, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';
import { paginate, sort } from '@shared/components';
import { InitialQueryParams as InitialQueryParamsOrganizationMembers } from '../ui/OrganizationMembersUIHelpers';
import { organizationAtoms } from '@modules/organization';
import { authAtoms, authSelectors } from '@modules/auth';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

const settings = selector<OrganizationSettings>({
  key: 'organization.settings',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings?.hasOwnProperty('organization')) return {};

    return JSON.parse(userSettings?.organization ?? '{}');
  },
});

const defaultOrganization = selector<DefaultOrganization | null>({
  key: 'organization.settings.default',
  get: ({ get }) => {
    const orgSettings = get(settings);
    const organizations = get(organizationAtoms.allOrganizations);
    const isSuperUser = get(authSelectors.isSuperUser);

    const defOrg = orgSettings?.default ?? null;

    if (organizations?.length && defOrg && !isSuperUser) {
      const org = organizations.find((org) => org?.id === defOrg?.id);

      if (!org)
        return {
          id: organizations[0].id,
          name: organizations[0].name,
        };
    }

    return defOrg;
  },
});

const allOrganizationsSorted = selector<Org[]>({
  key: 'organization.allSorted',
  get: ({ get }) => {
    const organizations = get(organizationAtoms.allOrganizations);
    return [...organizations].sort((orgA: Org, orgB: Org) => {
      if (orgA.name!.toLocaleLowerCase() < orgB.name!.toLocaleLowerCase())
        return -1;
      if (orgA.name!.toLocaleLowerCase() > orgB.name!.toLocaleLowerCase())
        return 1;
      return 0;
    });
  },
});

const organizationMembersActive = selectorFamily<
  OrgUser[],
  InitialQueryParamsOrganizationMembers
>({
  key: 'organizations.active',
  get:
    (queryParams) =>
    ({ get }) => {
      const org = get(organizationAtoms.selectedOrganization);

      if (!org?.members) return [];

      const sorted = sort(org?.members, {
        field: 'email',
        order: SortOrder.SORT_ORDER_ASCENDING,
      });

      const paginated = paginate(sorted, queryParams.pagination);

      return paginated;
    },
});

const organizationRoles = selector<OrgRole[]>({
  key: 'organization.roles',
  get: ({ get }) => {
    const user = get(authAtoms.user);
    const defOrg = get(defaultOrganization);
    const allOrgs = get(organizationAtoms.allOrganizations);

    const currentOrg = allOrgs.find((org) => org.id === defOrg?.id);
    const currentMember = currentOrg?.members?.find(
      (member) => member.userId === user?.id,
    );

    return currentMember?.roles ?? [];
  },
});

const organizationRole = selector({
  key: 'organization.role',
  get: ({ get }) => {
    const roles = get(organizationRoles);
    const isOwner = roles?.some((role) => role.name === 'org-owner');
    const isAdmin = roles?.some((role) => role.name === 'org-admin');
    const isMember = roles?.some((role) => role.name === 'org-member');

    return {
      isOwner,
      isAdmin,
      isMember,
    };
  },
});

export const organizationSelectors = {
  settings,

  defaultOrganization,

  allOrganizationsSorted,
  organizationMembersActive,

  organizationRoles,
  organizationRole,
};
