import { authClient } from '@modules/grpc';
import { useDefaultOrganization } from '@modules/organization';
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

      setPermissions(response);
    } catch (err) {
      console.log('getPermissionsError ', err);
    }
  };

  const hasPermission = (permission: string) =>
    permissions.find((p) => p === permission);

  return {
    getPermissions,
    hasPermission,
  };
}
