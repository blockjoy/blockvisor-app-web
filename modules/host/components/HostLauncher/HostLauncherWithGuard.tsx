import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { billingAtoms, withLauncherGuard } from '@modules/billing';
import { usePermissions } from '@modules/auth';
import { HostLauncher } from '@modules/host';

export const HostLauncherWithGuard = () => {
  const { hasPermission, isSuperUser } = usePermissions();
  const isEnabledBillingPreview = useRecoilValue(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
  );

  const canResetProvisionToken = hasPermission('org-provision-reset-token');
  const canAddHost = hasPermission('host-create');

  const canCreateSubscription = hasPermission('subscription-create');
  const canUpdateSubscription = hasPermission('subscription-update');

  const hasBillingPermissionsToCreate = isEnabledBillingPreview
    ? canCreateSubscription || canUpdateSubscription
    : true;

  const hasPermissionsToCreate =
    isSuperUser ||
    (canAddHost && canResetProvisionToken && hasBillingPermissionsToCreate);

  const HostLauncherGuarded = useMemo(
    () => withLauncherGuard(HostLauncher),
    [],
  );

  return (
    <HostLauncherGuarded
      type="launch-host"
      hasPermissionsToCreate={hasPermissionsToCreate}
    />
  );
};
