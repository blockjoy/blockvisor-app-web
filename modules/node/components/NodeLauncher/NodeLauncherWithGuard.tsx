import { useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
  const { hasPermission, isSuperUser } = usePermissions();
  const isEnabledBillingPreview = useRecoilValue(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
  );
  const setItemPrices = useSetRecoilState(billingAtoms.itemPrices);

  const canAddNode = hasPermission('node-create');

  const canCreateSubscription = hasPermission('subscription-create');
  const canUpdateSubscription = hasPermission('subscription-update');

  const hasBillingPermissionsToCreate = isEnabledBillingPreview
    ? canCreateSubscription || canUpdateSubscription
    : true;

  const hasPermissionsToCreate =
    isSuperUser || (canAddNode && hasBillingPermissionsToCreate);

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
      hasPermissionsToCreate={hasPermissionsToCreate}
    />
  );
};
