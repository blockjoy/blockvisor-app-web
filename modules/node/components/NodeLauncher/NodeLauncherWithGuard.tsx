import { useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  billingAtoms,
  withLauncherGuard,
  billingSelectors,
} from '@modules/billing';
import { authSelectors } from '@modules/auth';
import { NodeLauncher } from '@modules/node';

export const NodeLauncherWithGuard = () => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const bypassBillingForSuperUser = useRecoilValue(
    billingSelectors.bypassBillingForSuperUser,
  );

  const canAddNode = useRecoilValue(authSelectors.hasPermission('node-create'));
  const canCreateSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-create'),
  );
  const canUpdateSubscription = useRecoilValue(
    authSelectors.hasPermission('subscription-update'),
  );

  const hasBillingPermissionsToCreate =
    canCreateSubscription || canUpdateSubscription;

  const isPermittedAsSuperUser = isSuperUser && bypassBillingForSuperUser;

  const hasPermissionsToCreate =
    isPermittedAsSuperUser || (canAddNode && hasBillingPermissionsToCreate);

  const NodeLauncherGuarded = useMemo(
    () => withLauncherGuard(NodeLauncher),
    [],
  );

  return (
    <NodeLauncherGuarded
      type="launch-node"
      hasPermissionsToCreate={hasPermissionsToCreate}
    />
  );
};
