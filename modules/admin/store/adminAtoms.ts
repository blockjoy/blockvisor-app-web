import { atom } from 'recoil';

const users = atom<any[] | null>({
  key: 'admin.users',
  default: null,
});

export const adminAtoms = { users };
