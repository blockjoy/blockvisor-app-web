import { useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  WithLauncherGuardAdditionalProps,
  billingAtoms,
  withLauncherGuard,
  billingSelectors,
} from '@modules/billing';
import { authSelectors } from '@modules/auth';
import { NodeLauncher } from '@modules/node';

export const NodeLauncherWithGuard = ({
  itemPrices,
}: WithLauncherGuardAdditionalProps) => {
  const setItemPrices = useSetRecoilState(billingAtoms.itemPrices);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const isEnabledBillingPreview = useRecoilValue(
    billingSelectors.isEnabledBillingPreview,
  );

  const canAddNode = useRecoilValue(authSelectors.hasPermission('node-create'));
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
