import { atom } from 'recoil';

const currentOrganisation = atom<string | null>({
  key: 'organisation.current',
  default: null,
});

const allOrganisations = atom<{
  organisations?: Organizations[];
  isLoading?: boolean;
} | null>({
  key: 'organisation.all',
  default: null,
});

export const organisationAtoms = {
  currentOrganisation,
  allOrganisations,
};
