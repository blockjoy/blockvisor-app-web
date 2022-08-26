import { DefaultValue, selector } from 'recoil';
import { User } from '..';
import { authAtoms } from './atoms';

const { creationTimeAtom, emailAtom, userUidAtom } = authAtoms;

const user = selector<User | null>({
  key: 'authentication.user',
  get: ({ get }) => {
    return {
      userUid: get(userUidAtom),
      email: get(emailAtom),
      creationTime: get(creationTimeAtom),
    };
  },
  set: ({ set }, user) => {
    if (user && !(user instanceof DefaultValue)) {
      set(emailAtom, user.email);
      set(userUidAtom, user.userUid);
      set(creationTimeAtom, user.creationTime);
    }
  },
});

const isLoggedIn = selector({
  key: 'authentication.isLoggedIn',
  get: ({ get }) => {
    if (get(emailAtom)) return true;
    if (get(emailAtom) === null) return false;

    return Boolean(get(emailAtom));
  },
});

export const authSelectors = {
  user,
  isLoggedIn,
};
