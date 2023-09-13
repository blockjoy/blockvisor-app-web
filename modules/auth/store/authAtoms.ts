import { atom } from 'recoil';

const user = atom<User | null>({
  key: 'authentication.user',
  default: null,
  effects: [
    ({ setSelf }) => {
      const savedIdentity =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('identity')
          : null;
      if (savedIdentity) {
        setSelf(JSON.parse(savedIdentity));
      }
    },
  ],
});

const permissions = atom<string[]>({
  key: 'auth.permissions',
  default: [],
});

const loading = atom<LoadingState>({
  key: 'authentication.loading',
  default: 'initializing',
});

export const authAtoms = {
  user,
  loading,
  permissions,
};
