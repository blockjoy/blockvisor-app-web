import { selector } from 'recoil';
import { UserRole } from '@modules/grpc/library/blockjoy/v1/user';
import { authAtoms } from './authAtoms';
import { USER_ROLES } from '@modules/auth/hooks/useHasPermissions';

const isSuperUser = selector<boolean>({
  key: 'authentication.user.isSuperUser',
  get: ({ get }) => {
    const user = get(authAtoms.user);

    return user?.role === UserRole.USER_ROLE_BLOCKJOY_ADMIN;
  },
});

const userRole = selector<UserRole | null>({
  key: 'authentication.user.role',
  get: ({ get }) => {
    const user = get(authAtoms.user);
    if (!user || !user.role) return null;

    return USER_ROLES[user?.role];
  },
});

export const authSelectors = {
  isSuperUser,
  userRole,
};
