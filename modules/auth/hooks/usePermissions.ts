import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';
import { sort } from '@shared/components';
import { authAtoms } from '../store/authAtoms';
import { useIdentity } from './useIdentity';

export function usePermissions() {
  const [permissions, setPermissions] = useRecoilState(authAtoms.permissions);
  const [permissionsLoadingState, setPermissionsLoadingState] = useRecoilState(
    authAtoms.permissionsLoadingState,
  );
  const [isSuperUser, setIsSuperUser] = useRecoilState(authAtoms.isSuperUser);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const { user } = useIdentity();

  const getPermissions = async () => {
    setPermissionsLoadingState('initializing');
    try {
      const response = await authClient.listPermissions(
        user?.id!,
        defaultOrganization?.id!,
      );

      console.log('getPermissionsResponse: ', sort(response));

      setPermissions(response);
    } catch (err) {
      console.log('getPermissionsError: ', err);
      setPermissions([]);
    } finally {
      setPermissionsLoadingState('finished');
    }
  };

  const hasPermission = (permission: Permission) =>
    permissions?.findIndex((p) => p === permission)! > -1;

  useEffect(() => {
    const hasSuperUserPermission = hasPermission('auth-admin-list-permissions');
    setIsSuperUser(hasSuperUserPermission);
  }, [permissions]);

  return {
    permissions,
    permissionsLoadingState,
    isSuperUser,
    getPermissions,
    hasPermission,
  };
}
