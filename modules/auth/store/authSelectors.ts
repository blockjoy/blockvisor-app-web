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

const userRole = selector<UserRole>({
  key: 'authentication.user.role',
  get: ({ get }) => {
    const user = get(authAtoms.user);
    if (!user?.role) return UserRole.USER_ROLE_UNPRIVILEGED;

    return user.role;
  },
});

const userRoleName = selector<string>({
  key: 'authentication.user.roleName',
  get: ({ get }) => {
    const usrRole = get(userRole);

    return USER_ROLES[usrRole];
  },
});

export const authSelectors = {
  isSuperUser,
  userRole,
  userRoleName,
};
