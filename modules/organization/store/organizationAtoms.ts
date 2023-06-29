import { atom, selector, selectorFamily } from 'recoil';
import { paginate, sort, filter } from '@shared/components';
import {
  InitialQueryParams as InitialQueryParamsOrganizations,
  initialQueryParams,
} from '../ui/OrganizationsUIHelpers';
import { InitialQueryParams as InitialQueryParamsOrganizationMembers } from '../ui/OrganizationMembersUIHelpers';
import { localStorageEffect } from 'utils/store/persist';
import { Org, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';

const selectedOrganization = atom<Org | null>({
  key: 'organization.current',
  default: null,
});

const defaultOrganization = atom<{ name: string; id: string } | null>({
  key: 'organization.default',
  default: null,
  effects: [localStorageEffect('defaultOrganization')],
});

const organizationsPageIndex = atom<number>({
  key: 'organization.pageIndex',
  default: 0,
});

const allOrganizations = atom<Org[]>({
  key: 'organization.all',
  default: [],
});

const allOrganizationsSorted = selector<Org[]>({
  key: 'organization.allSorted',
  get: ({ get }) => {
    const organizations = get(allOrganizations);
    return [...organizations].sort((orgA: Org, orgB: Org) => {
      if (orgA.name!.toLocaleLowerCase() < orgB.name!.toLocaleLowerCase())
        return -1;
      if (orgA.name!.toLocaleLowerCase() > orgB.name!.toLocaleLowerCase())
        return 1;
      return 0;
    });
  },
});

const organizationsFilters = atom<InitialQueryParamsOrganizations>({
  key: 'organization.filters',
  default: initialQueryParams,
  effects: [localStorageEffect('organizationsFilters')],
});

const organizationsLoadingState = atom<LoadingState>({
  key: 'organizations.loadingState',
  default: 'initializing',
});

const organizationLoadingState = atom<LoadingState>({
  key: 'organization.loadingState',
  default: 'loading',
});

const organizationsFiltered = selectorFamily<
  Org[],
  InitialQueryParamsOrganizations
>({
  key: 'organizations.active.filtered',
  get:
    (queryParams) =>
    ({ get }) => {
      const allOrgs = get(allOrganizations);
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
      const org = get(selectedOrganization);

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

const organizationMemberLoadingState = atom<LoadingState>({
  key: 'organization.member.loadingState',
  default: 'initializing',
});

const provisionToken = atom<string>({
  key: 'organization.provisionToken',
  default: '',
});

const provisionTokenLoadingState = atom<LoadingState>({
  key: 'organization.provisionToken.loadingState',
  default: 'finished',
});

export const organizationAtoms = {
  selectedOrganization,
  organizationsPageIndex,
  organizationLoadingState,
  organizationsLoadingState,
  allOrganizations,
  allOrganizationsSorted,
  organizationsFilters,
  organizationsFiltered,
  organizationsActive,
  organizationMembersActive,
  defaultOrganization,
  organizationMemberLoadingState,
  provisionToken,
  provisionTokenLoadingState,
};
