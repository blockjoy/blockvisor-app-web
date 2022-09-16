import { atom, selector } from 'recoil';

const currentOrganisation = atom<string | null>({
  key: 'organisation.current',
  default: null,
});

const allOrganisations = atom<{
  organisations?: Organisation[];
  isLoading?: boolean;
}>({
  key: 'organisation.all',
  default: {
    organisations: [],
    isLoading: false,
  },
});

const organisationMemberCount = selector({
  key: 'organisation.memberCount',
  get: ({ get }) => {
    const organisations = get(allOrganisations);

    return organisations.organisations?.reduce(
      (acc, org) => acc + (org?.memberCount ?? 0),
      0,
    );
  },
});

const organisationCount = selector({
  key: 'organisation.count',
  get: ({ get }) => {
    const organisations = get(allOrganisations);

    return organisations?.organisations?.length;
  },
});

export const organisationAtoms = {
  currentOrganisation,
  allOrganisations,
  organisationMemberCount,
  organisationCount,
};
