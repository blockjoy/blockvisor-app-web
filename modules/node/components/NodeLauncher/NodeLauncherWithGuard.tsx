import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { withLauncherGuard } from '@modules/billing';
import { NodeLauncher } from '@modules/node';
import { authSelectors } from '@modules/auth';

export const NodeLauncherWithGuard = () => {
  const canAddNode = useRecoilValue(authSelectors.hasPermission('node-create'));

  const NodeLauncherGuarded = useMemo(
    () => withLauncherGuard(NodeLauncher),
    [],
  );

  return (
    <NodeLauncherGuarded
      type="launch-node"
      hasPermissionsToCreate={canAddNode}
    />
  );
};
