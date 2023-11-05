import { withLauncherGuard } from '@modules/billing';
import { usePermissions } from '@modules/auth';
import { HostLauncher } from '@modules/host';

export const HostLauncherWithGuard = () => {
  const { hasPermission } = usePermissions();

  const canResetProvisionToken = hasPermission('org-provision-reset-token');
  const canAddHost = hasPermission('host-create');
  const canCreateSubscription = hasPermission('subscription-create');
  const canUpdateSubscription = hasPermission('subscription-update');

  const isPermittedToCreate =
    canAddHost &&
    canResetProvisionToken &&
    (canCreateSubscription || canUpdateSubscription);

  const HostLauncherGuarded = withLauncherGuard(HostLauncher);

  return (
    <HostLauncherGuarded
      type="launch-host"
      isPermittedToCreate={isPermittedToCreate}
    />
  );
};
