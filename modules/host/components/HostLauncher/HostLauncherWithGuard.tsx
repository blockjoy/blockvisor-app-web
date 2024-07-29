import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { withLauncherGuard } from '@modules/billing';
import { HostLauncher } from '@modules/host';
import { authSelectors } from '@modules/auth';

export const HostLauncherWithGuard = () => {
  const canResetProvisionToken = useRecoilValue(
    authSelectors.hasPermission('org-provision-reset-token'),
  );
  const canAddHost = useRecoilValue(authSelectors.hasPermission('host-create'));

  const HostLauncherGuarded = useMemo(
    () => withLauncherGuard(HostLauncher),
    [],
  );

  return (
    <HostLauncherGuarded
      type="launch-host"
      hasPermissionsToCreate={canAddHost && canResetProvisionToken}
    />
  );
};
