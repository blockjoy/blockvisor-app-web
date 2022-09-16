import { atom } from 'recoil';

const currentOrganisation = atom<string | null>({
  key: 'organisation.current',
  default: null,
});

const allOrganisations = atom<string[] | null>({
  key: 'organisation.all',
  default: null,
});

export const authAtoms = {
  currentOrganisation,
  allOrganisations,
};
