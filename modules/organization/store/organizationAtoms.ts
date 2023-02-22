import { atom, selector, selectorFamily } from 'recoil';
import { paginate } from '@modules/organization/utils/paginate';
import { sort } from '@modules/organization/utils/sort';

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

const organizationsActive = selectorFamily<any, any>({
  key: 'organizations.active',
  get:
    (queryParams) =>
    ({ get }) => {
      const allOrgs = get(allOrganizations);
      const { sorting, pagination } = queryParams;

      const sortedOrganizations = sort(allOrgs, sorting);
      const paginatedOrganizations = paginate(sortedOrganizations, pagination);

      return paginatedOrganizations;
    },
});

const organizationMembers = atom<ClientOrganizationMember[]>({
  key: 'organization.members.all',
  default: [],
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
  organizationsActive,
  organizationMemberCount,
  organisationCount,
  defaultOrganization,
  organizationMembers,
  organizationMemberLoadingState,
  organizationMembersLoadingState,
  organizationMembersPageIndex,
  organizationSentInvitations,
  organizationSentInvitationsLoadingState,
  organizationReceivedInvitations,
};
