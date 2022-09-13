import { atom } from 'recoil';

const accessTokenAtom = atom<string | null>({
  key: 'authentication.user.accessToken',
  default: null,
});

export const authAtoms = {
  accessTokenAtom,
};
