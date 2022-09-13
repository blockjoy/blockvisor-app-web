import { getUser } from '@shared/utils/browserStorage';
import { atom } from 'recoil';

const user = atom<User | null>({
  key: 'authentication.user',
  default: getUser(),
});

export const authAtoms = {
  user,
};
