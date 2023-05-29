import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getNodeStatusColor } from './NodeStatus';
import { nodeStatusList } from '@shared/constants/lookups';

import { SvgIcon } from '@shared/components';

const IconUndefined = dynamic(
  () => import('@public/assets/icons/nodeStatus/Undefined.svg'),
);
const IconEarning = dynamic(
  () => import('@public/assets/icons/nodeStatus/Earning.svg'),
);
const IconProcessing = dynamic(
  () => import('@public/assets/icons/nodeStatus/Processing.svg'),
);
const IconBroadcasting = dynamic(
  () => import('@public/assets/icons/nodeStatus/Broadcasting.svg'),
);
const IconCancelled = dynamic(
  () => import('@public/assets/icons/nodeStatus/Cancelled.svg'),
);
const IconDelegating = dynamic(
  () => import('@public/assets/icons/nodeStatus/Delegating.svg'),
);
const IconDelinquent = dynamic(
  () => import('@public/assets/icons/nodeStatus/Delinquent.svg'),
);
const IconDisabled = dynamic(
  () => import('@public/assets/icons/nodeStatus/Disabled.svg'),
);
const IconElected = dynamic(
  () => import('@public/assets/icons/nodeStatus/Elected.svg'),
);
const IconElecting = dynamic(
  () => import('@public/assets/icons/nodeStatus/Electing.svg'),
);
const IconExporting = dynamic(
  () => import('@public/assets/icons/nodeStatus/Exporting.svg'),
);
const IconIngesting = dynamic(
  () => import('@public/assets/icons/nodeStatus/Ingesting.svg'),
);
const IconMining = dynamic(
  () => import('@public/assets/icons/nodeStatus/Mining.svg'),
);
const IconMinting = dynamic(
  () => import('@public/assets/icons/nodeStatus/Minting.svg'),
);
const IconRelaying = dynamic(
  () => import('@public/assets/icons/nodeStatus/Relaying.svg'),
);
const IconRemoved = dynamic(
  () => import('@public/assets/icons/nodeStatus/Removed.svg'),
);
const IconRemoving = dynamic(
  () => import('@public/assets/icons/nodeStatus/Removing.svg'),
);

const icons = {
  0: <IconUndefined />,
  1: <IconProcessing />,
  2: <IconBroadcasting />,
  3: <IconCancelled />,
  4: <IconDelegating />,
  5: <IconDelinquent />,
  6: <IconDisabled />,
  7: <IconEarning />,
  8: <IconElected />,
  9: <IconElecting />,
  10: <IconExporting />,
  11: <IconIngesting />,
  12: <IconMining />,
  13: <IconMinting />,
  14: <IconProcessing />,
  15: <IconRelaying />,
  16: <IconRemoved />,
  17: <IconRemoving />,
};

const getIcon = (status: number) => {
  return icons[status];
};

type NodeStatusIconProps = {
  status: number;
  size: string;
};

export const NodeStatusIcon = ({
  status,
  size = '24px',
}: NodeStatusIconProps) => {
  const statusInfo = nodeStatusList.find((s) => s.id === status);
  return (
    <Suspense fallback={null}>
      <SvgIcon
        additionalStyles={[
          getNodeStatusColor(statusInfo!.name, statusInfo!.isOnline),
        ]}
        size={size}
      >
        {getIcon(status)}
      </SvgIcon>
    </Suspense>
  );
};
