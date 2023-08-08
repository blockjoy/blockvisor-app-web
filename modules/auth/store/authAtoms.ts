import { atom } from 'recoil';
import { User } from 'types/Auth';

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

const loading = atom<LoadingState>({
  key: 'authentication.loading',
  default: 'initializing',
});

export const authAtoms = {
  user,
  loading,
};
