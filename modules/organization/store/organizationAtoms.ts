import { atom, selector, selectorFamily } from 'recoil';
import { paginate, sort, filter } from '@shared/components';
import {
  InitialQueryParams as InitialQueryParamsOrganizations,
  initialQueryParams,
} from '../ui/OrganizationsUIHelpers';
import { localStorageEffect } from 'utils/store/persist';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';

const selectedOrganization = atom<Org | null>({
  key: 'organization.current',
  default: null,
});

const defaultOrganization = atom<{ name: string; id: string } | null>({
  key: 'organization.default',
  default: null,
  effects: [
    ({ setSelf }) => {
      const savedIdentity =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('identity')
          : null;
      if (savedIdentity) {
        const defaultOrg = JSON.parse(savedIdentity)['defaultOrganization'];
        if (defaultOrg) setSelf(defaultOrg);
      }
    },
  ],
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
  default: 'initializing',
});

const organizationDefaultLoadingState = atom<LoadingState>({
  key: 'organization.defaultOrgloadingState',
  default: 'initializing',
});

const organizationDeleteLoadingState = atom<LoadingState>({
  key: 'organization.organizationDeleteLoadingState',
  default: 'initializing',
});

const organizationMemberCount = selector({
  key: 'organization.memberCount',
  get: ({ get }) => {
    const organisations = get(allOrganizations);

    return organisations.reduce((acc, org) => acc + (org?.memberCount ?? 0), 0);
  },
});

const organisationCount = selector({
  key: 'organization.count',
  get: ({ get }) => {
    const organizations = get(allOrganizations);

    return organizations.length;
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

const organizationMembersPageIndex = atom<number>({
  key: 'organization.member.pageIndex',
  default: 0,
});

const organizationMemberLoadingState = atom<LoadingState>({
  key: 'organization.member.loadingState',
  default: 'initializing',
});

const organizationMembersLoadingState = atom<LoadingState>({
  key: 'organization.members.loadingState',
  default: 'initializing',
});

const organizationSentInvitations = atom<Invitation[]>({
  key: 'organizationSentInvitations',
  default: [],
});

const organizationSentInvitationsLoadingState = atom<LoadingState>({
  key: 'organizationSentInvitations.loadingState',
  default: 'initializing',
});

const organizationReceivedInvitations = atom<any[]>({
  key: 'organizationReceivedInvitations',
  default: [],
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
  organizationDeleteLoadingState,
  organizationDefaultLoadingState,
  organizationsLoadingState,
  allOrganizations,
  allOrganizationsSorted,
  organizationsFilters,
  organizationsFiltered,
  organizationsActive,
  organizationMemberCount,
  organisationCount,
  defaultOrganization,
  organizationMemberLoadingState,
  organizationMembersLoadingState,
  organizationMembersPageIndex,
  organizationSentInvitations,
  organizationSentInvitationsLoadingState,
  organizationReceivedInvitations,
  provisionToken,
  provisionTokenLoadingState,
};
