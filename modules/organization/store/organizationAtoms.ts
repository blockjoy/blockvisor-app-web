import { atom, selector, selectorFamily } from 'recoil';
import { paginate } from '@shared/components/Table/utils/paginate';
import { sort } from '@shared/components/Table/utils/sort';
import { filter } from '@shared/components/Table/utils/filter';
import { InitialQueryParams as InitialQueryParamsMembers } from '../ui/OrganizationMembersUIHelpers';
import {
  InitialQueryParams as InitialQueryParamsOrganizations,
  initialQueryParams,
} from '../ui/OrganizationsUIHelpers';
import {
  mapMembersAndInvitations,
  MemberAndInvitation,
} from '../utils/mapMembersAndInvitations';
import { localStorageEffect } from 'utils/store/persist';

const selectedOrganization = atom<ClientOrganization | null>({
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

const allOrganizations = atom<ClientOrganization[]>({
  key: 'organization.all',
  default: [],
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
  ClientOrganization[],
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
  ClientOrganization[],
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

const organizationMembers = atom<ClientOrganizationMember[]>({
  key: 'organization.members.all',
  default: [],
});

const organizationMembersAndInvitationsFiltered = selectorFamily<
  MemberAndInvitation[],
  InitialQueryParamsMembers
>({
  key: 'organizations.members.filtered',
  get:
    (queryParams) =>
    ({ get }) => {
      const allOrgMembers = get(organizationMembers);
      const allInvitations = get(organizationSentInvitations);

      const all = allOrgMembers.concat(allInvitations);
      const mappedAll = mapMembersAndInvitations(all);
      const { sorting } = queryParams;

      const sortedAll = sort(mappedAll, sorting);
      return sortedAll;
    },
});

const organizationMembersAndInvitations = selectorFamily<
  MemberAndInvitation[],
  InitialQueryParamsMembers
>({
  key: 'organizations.members.active',
  get:
    (queryParams) =>
    ({ get }) => {
      const allOrgMembers = get(
        organizationMembersAndInvitationsFiltered(queryParams),
      );
      const { pagination } = queryParams;

      const paginatedAll = paginate(allOrgMembers, pagination);
      return paginatedAll;
    },
});

const organizationMembersAndInvitationsTotal = selector<number>({
  key: 'organizations.members.total',
  get: ({ get }) => {
    const allOrgMembers = get(organizationMembers);
    const allInvitations = get(organizationSentInvitations);

    return allOrgMembers.length + allInvitations.length;
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

const organizationSentInvitations = atom<any[]>({
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

export const organizationAtoms = {
  selectedOrganization,
  organizationsPageIndex,
  organizationLoadingState,
  organizationDeleteLoadingState,
  organizationDefaultLoadingState,
  organizationsLoadingState,
  allOrganizations,
  organizationsFilters,
  organizationsFiltered,
  organizationsActive,
  organizationMemberCount,
  organisationCount,
  defaultOrganization,
  organizationMembers,
  organizationMembersAndInvitations,
  organizationMembersAndInvitationsFiltered,
  organizationMembersAndInvitationsTotal,
  organizationMemberLoadingState,
  organizationMembersLoadingState,
  organizationMembersPageIndex,
  organizationSentInvitations,
  organizationSentInvitationsLoadingState,
  organizationReceivedInvitations,
};
