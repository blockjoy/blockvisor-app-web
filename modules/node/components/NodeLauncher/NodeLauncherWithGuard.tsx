import { useEffect, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  WithLauncherGuardAdditionalProps,
  billingAtoms,
  withLauncherGuard,
} from '@modules/billing';
import { usePermissions } from '@modules/auth';
import { NodeLauncher } from '@modules/node';

export const NodeLauncherWithGuard = ({
  itemPrices,
}: WithLauncherGuardAdditionalProps) => {
  const setItemPrices = useSetRecoilState(billingAtoms.itemPrices);

  const { hasPermission } = usePermissions();

  const canAddNode = hasPermission('node-create');
  const canCreateSubscription = hasPermission('subscription-create');
  const canUpdateSubscription = hasPermission('subscription-update');

  const isPermittedToCreate =
    canAddNode && (canCreateSubscription || canUpdateSubscription);

  const NodeLauncherGuarded = useMemo(
    () => withLauncherGuard(NodeLauncher),
    [],
  );

  useEffect(() => {
    setItemPrices(itemPrices ?? null);
  }, [itemPrices]);

  return (
    <NodeLauncherGuarded
      type="launch-node"
      isPermittedToCreate={isPermittedToCreate}
    />
  );
};
