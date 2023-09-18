import { authClient } from '@modules/grpc';
import { useDefaultOrganization } from '@modules/organization';
import { sort } from '@shared/components';
import { useRecoilState } from 'recoil';
import { authAtoms } from '../store/authAtoms';
import { useIdentity } from './useIdentity';

export function usePermissions() {
  const [permissions, setPermissions] = useRecoilState(authAtoms.permissions);

  const { defaultOrganization } = useDefaultOrganization();

  const { user } = useIdentity();

  const getPermissions = async () => {
    try {
      const response = await authClient.listPermissions(
        user?.id!,
        defaultOrganization?.id!,
      );

      console.log(
        'getPermissionsResponse: ',
        sort(response, { field: '', order: 'asc' }),
      );

      setPermissions(response);
    } catch (err) {
      console.log('getPermissionsError: ', err);
      setPermissions([]);
    }
  };

  const hasPermission = (permission: Permission) =>
    permissions.findIndex((p) => p === permission) > -1;

  return {
    permissions,
    getPermissions,
    hasPermission,
  };
}
