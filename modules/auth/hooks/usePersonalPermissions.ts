import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authClient } from '@modules/grpc';
import { authAtoms } from '@modules/auth';
import { organizationSelectors } from '@modules/organization';

export const usePersonalPermissions = () => {
  const user = useRecoilValue(authAtoms.user);
  const personalOrganization = useRecoilValue(
    organizationSelectors.personalOrganization,
  );

  const [permissions, setPermissions] = useState<string[]>([]);
  const [permissionsLoadingState, setPermissionsLoadingState] =
    useState<LoadingState>('finished');

  const listPermissions = async () => {
    try {
      setPermissionsLoadingState('loading');

      const response = await authClient.listPermissions(
        user?.userId!,
        personalOrganization?.orgId!,
      );

      setPermissions(response);
    } catch (error: any) {
      console.log('Error while fetching permissions: ', error);
      setPermissions([]);
    } finally {
      setPermissionsLoadingState('finished');
    }
  };

  return {
    permissions,
    permissionsLoadingState,

    listPermissions,
  };
};
