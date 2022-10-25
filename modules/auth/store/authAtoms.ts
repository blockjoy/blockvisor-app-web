import { atom } from 'recoil';

const user = atom<User | null>({
  key: 'authentication.user',
  default: null,
});

export const authAtoms = {
  user,
};
