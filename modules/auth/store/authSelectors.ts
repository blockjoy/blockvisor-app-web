import { selector, selectorFamily } from 'recoil';
import { authAtoms } from '@modules/auth';

const hasPermission = selectorFamily<boolean, Permission>({
  key: 'auth.permissions.authorized',
  get:
    (permission: Permission) =>
    ({ get }) => {
      const permissions = get(authAtoms.permissions);

      return Boolean(permissions?.indexOf(permission));
    },
});

const isSuperUser = selector<boolean>({
  key: 'auth.permissions.isSuperUser',
  get: () => hasPermission('auth-admin-list-permissions'),
});

export const authSelectors = {
  hasPermission,
  isSuperUser,
};
