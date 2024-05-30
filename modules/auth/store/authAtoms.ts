import { atom } from 'recoil';
import { localStorageEffect } from 'utils/store/persist';

const user = atom<User | null>({
  key: 'auth.user',
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

const userSettings = atom<UserSettings>({
  key: 'auth.user.settings',
  default: {},
  effects: [localStorageEffect('user.settings')],
});

const userSettingsLoadingState = atom<LoadingState>({
  key: 'auth.user.settings.loadingState',
  default: 'finished',
});

export const authAtoms = {
  user,
  permissions,
  permissionsLoadingState,

  userSettings,
  userSettingsLoadingState,
};
