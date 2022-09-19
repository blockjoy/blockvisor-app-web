import { atom, selector } from 'recoil';

const selectedOrganisation = atom<Organisation | null>({
  key: 'organisation.current',
  default: null,
});

const allOrganisations = atom<Organisation[]>({
  key: 'organisation.all',
  default: [],
});

const organisationMemberCount = selector({
  key: 'organisation.memberCount',
  get: ({ get }) => {
    const organisations = get(allOrganisations);

    return organisations.reduce((acc, org) => acc + (org?.memberCount ?? 0), 0);
  },
});

const organisationCount = selector({
  key: 'organisation.count',
  get: ({ get }) => {
    const organisations = get(allOrganisations);

    return organisations.length;
  },
});

export const organisationAtoms = {
  selectedOrganisation,
  allOrganisations,
  organisationMemberCount,
  organisationCount,
};
