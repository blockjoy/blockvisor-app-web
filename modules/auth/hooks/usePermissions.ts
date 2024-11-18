import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { authClient } from '@modules/grpc';
import { organizationSelectors } from '@modules/organization';
import { authAtoms } from '../store/authAtoms';
import { useIdentity } from './useIdentity';
import { sort } from '@shared/components';

export function usePermissions() {
  const [permissions, setPermissions] = useRecoilState(authAtoms.permissions);
  const [permissionsLoadingState, setPermissionsLoadingState] = useRecoilState(
    authAtoms.permissionsLoadingState,
  );
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const { user } = useIdentity();

  const fetcher = async () => {
    setPermissionsLoadingState('loading');

    return await authClient.listPermissions(
      user?.userId!,
      defaultOrganization?.orgId!,
    );
  };

  useSWR(
    defaultOrganization?.orgId
      ? `permissions_${defaultOrganization.orgId}`
      : null,
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
