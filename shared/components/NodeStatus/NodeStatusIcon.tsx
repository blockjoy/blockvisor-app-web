import { FC, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getColor } from './NodeStatus';
import { nodeStatusList } from '@shared/constants/lookups';

import { styles } from './NodeStatus.styles';
import { SvgIcon } from '../SvgIcon/SvgIcon';

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
  1: <IconEarning />,
  2: <IconProcessing />,
  3: <IconProcessing />,
  4: <IconBroadcasting />,
  5: <IconCancelled />,
  6: <IconDelegating />,
  7: <IconDelinquent />,
  8: <IconDisabled />,
  9: <IconElected />,
  10: <IconElecting />,
  11: <IconExporting />,
  12: <IconIngesting />,
  13: <IconMining />,
  14: <IconMinting />,
  15: <IconRelaying />,
  16: <IconRemoved />,
  17: <IconRemoving />,
};

const getIcon = (status: number) => {
  return icons[status];
};

type Props = {
  status: number;
  size: string;
};

export const NodeStatusIcon: FC<Props> = ({ status, size = '24px' }) => {
  const statusInfo = nodeStatusList.find((s) => s.id === status);
  return (
    <Suspense fallback={null}>
      <SvgIcon
        additionalStyles={[getColor(statusInfo!.name, statusInfo!.isOnline)]}
        size={size}
      >
        {getIcon(status)}
      </SvgIcon>
    </Suspense>
  );
};
