import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { authClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';
import { authAtoms } from '../store/authAtoms';
import { useIdentity } from './useIdentity';
import { sort } from '@shared/components';

export function usePermissions() {
  const [permissions, setPermissions] = useRecoilState(authAtoms.permissions);
  const [permissionsLoadingState, setPermissionsLoadingState] = useRecoilState(
    authAtoms.permissionsLoadingState,
  );
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const { user } = useIdentity();

  const fetcher = async () =>
    await authClient.listPermissions(user?.id!, defaultOrganization?.id!);

  useSWR(
    defaultOrganization?.id ? `permissions_${defaultOrganization.id}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,

      onSuccess: (data) => {
        console.log('getPermissionsResponse: ', sort(data));
        setPermissions(data);
        setPermissionsLoadingState('finished');
      },
      onError: (error) => {
        console.log('getPermissionsError: ', error);
        setPermissions([]);
        setPermissionsLoadingState('finished');
      },
    },
  );

  return {
    permissions,
    permissionsLoadingState,
  };
}
