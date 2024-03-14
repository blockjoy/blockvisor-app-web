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

const permissions = atom<string[] | undefined>({
  key: 'auth.permissions',
  default: undefined,
});

const permissionsLoadingState = atom<LoadingState>({
  key: 'auth.permissions.loadingState',
  default: 'initializing',
});

export const authAtoms = {
  user,
  permissions,
  permissionsLoadingState,
};
