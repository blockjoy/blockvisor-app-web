import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { billingSelectors, withLauncherGuard } from '@modules/billing';
import { HostLauncher } from '@modules/host';
import { authSelectors } from '@modules/auth';

export const HostLauncherWithGuard = () => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const isEnabledBillingPreview = useRecoilValue(
    billingSelectors.isEnabledBillingPreview,
  );

  const canResetProvisionToken = useRecoilValue(
    authSelectors.hasPermission('org-provision-reset-token'),
  );
  const canAddHost = useRecoilValue(authSelectors.hasPermission('host-create'));
  const canCreateSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-create'),
  );
  const canUpdateSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-update'),
  );

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
