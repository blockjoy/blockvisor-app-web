import { atom } from 'recoil';

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

export const organisationAtoms = {
  currentOrganisation,
  allOrganisations,
};
