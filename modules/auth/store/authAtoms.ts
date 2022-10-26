import { atom } from 'recoil';

const user = atom<User | null>({
  key: 'authentication.user',
  default: null,
});

const loading = atom<LoadingState>({
  key: 'authentication.loading',
  default: 'initializing',
});

export const authAtoms = {
  user,
  loading,
};
