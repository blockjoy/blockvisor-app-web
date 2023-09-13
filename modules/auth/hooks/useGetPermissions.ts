import { authClient } from '@modules/grpc';
import { useDefaultOrganization } from '@modules/organization';
import { sort } from '@shared/components';
import { useRecoilState } from 'recoil';
import { authAtoms } from '../store/authAtoms';
import { useIdentity } from './useIdentity';

export function useGetPermissions() {
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
    }
  };

  return {
    permissions,
    getPermissions,
  };
}
