import {
  WithLauncherGuardAdditionalProps,
  withLauncherGuard,
} from '@modules/billing';
import { usePermissions } from '@modules/auth';
import { NodeLauncher } from '@modules/node';

export const NodeLauncherWithGuard = ({
  itemPrices,
}: WithLauncherGuardAdditionalProps) => {
  const { hasPermission } = usePermissions();

  const canAddNode = hasPermission('node-create');
  const canCreateSubscription = hasPermission('subscription-create');
  const canUpdateSubscription = hasPermission('subscription-update');

  const isPermittedToCreate =
    canAddNode && (canCreateSubscription || canUpdateSubscription);

  const NodeLauncherGuarded = withLauncherGuard(NodeLauncher);

  return (
    <NodeLauncherGuarded
      type="launch-node"
      isPermittedToCreate={isPermittedToCreate}
      itemPrices={itemPrices}
    />
  );
};
