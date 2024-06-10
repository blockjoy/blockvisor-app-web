import { selector, selectorFamily } from 'recoil';
import { Org, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';
import { paginate, sort, filter } from '@shared/components';
import { InitialQueryParams as InitialQueryParamsOrganizations } from '../ui/OrganizationsUIHelpers';
import { InitialQueryParams as InitialQueryParamsOrganizationMembers } from '../ui/OrganizationMembersUIHelpers';
import { organizationAtoms } from '@modules/organization';
import { authAtoms } from '@modules/auth';

const settings = selector<OrganizationSettings>({
  key: 'organization.settings',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings.hasOwnProperty('organization')) return {};

    return JSON.parse(userSettings?.organization ?? '{}');
  },
});

const settingsDefaultOrg = selector<DefaultOrganization | null>({
  key: 'organization.settings.default',
  get: ({ get }) => {
    const orgSettings = get(settings);

    return orgSettings?.default ?? null;
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

const organizationsFiltered = selectorFamily<
  Org[],
  InitialQueryParamsOrganizations
>({
  key: 'organizations.active.filtered',
  get:
    (queryParams) =>
    ({ get }) => {
      const allOrgs = get(organizationAtoms.allOrganizations);
      const { sorting, filtering } = queryParams;

      const filteredOrganizations = filter(allOrgs, filtering);
      const sortedOrganizations = sort(filteredOrganizations, sorting);

      return sortedOrganizations;
    },
});

const organizationsActive = selectorFamily<
  Org[],
  InitialQueryParamsOrganizations
>({
  key: 'organizations.active',
  get:
    (queryParams) =>
    ({ get }) => {
      const allOrgs = get(organizationsFiltered(queryParams));

      const { pagination } = queryParams;

      const paginatedOrganizations = paginate(allOrgs, pagination);

      return paginatedOrganizations;
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

      const { pagination } = queryParams;

      if (!org?.members) {
        return [];
      }

      const sorted = sort(org?.members, {
        field: 'email',
        order: 'asc',
      });

      const paginated = paginate(sorted, pagination);

      return paginated;
    },
});

export const organizationSelectors = {
  settings,

  settingsDefaultOrg,

  allOrganizationsSorted,
  organizationsFiltered,
  organizationsActive,
  organizationMembersActive,
};
