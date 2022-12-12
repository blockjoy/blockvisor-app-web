import { atom, selector } from 'recoil';

const selectedOrganization = atom<ClientOrganization | null>({
  key: 'organization.current',
  default: null,
});

const defaultOrganization = atom<{ name: string; id: string } | null>({
  key: 'organization.default',
  default: null,
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

export const organisationAtoms = {
  selectedOrganization,
  organizationLoadingState,
  organizationsLoadingState,
  allOrganizations,
  organizationMemberCount,
  organisationCount,
  defaultOrganization,
};
