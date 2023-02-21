import { FC, Suspense } from 'react';
import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/lookups';
import dynamic from 'next/dynamic';

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
  Undefined: <IconUndefined />,
  Earning: <IconEarning />,
  Processing: <IconProcessing />,
  Provisioning: <IconProcessing />,
  Broadcasting: <IconBroadcasting />,
  Cancelled: <IconCancelled />,
  Delegating: <IconDelegating />,
  Delinquent: <IconDelinquent />,
  Disabled: <IconDisabled />,
  Elected: <IconElected />,
  Electing: <IconElecting />,
  Exporting: <IconExporting />,
  Ingesting: <IconIngesting />,
  Mining: <IconMining />,
  Minting: <IconMinting />,
  Relaying: <IconRelaying />,
  Removed: <IconRemoved />,
  Removing: <IconRemoving />,
};

const getIcon = (name: string = '') => {
  return icons[name];
};

const getColor = (name: string, isOnline: boolean) => {
  if (name === 'Processing' || name === 'Provisioning') {
    return styles.statusColorDefault;
  }

  if (isOnline) {
    return styles.statusColorGreen;
  } else {
    return styles.statusColorRed;
  }
};

type Props = {
  status: number;
  hasBorder?: boolean;
};

export const NodeStatus: FC<Props> = ({ status, hasBorder = true }) => {
  const statusInfo = nodeStatusList.find((s) => s.id === status);

  return (
    <span
      css={[
        styles.status,
        hasBorder && styles.statusBorder,
        getColor(statusInfo?.name!, statusInfo?.isOnline!),
      ]}
    >
      <Suspense fallback={null}>{getIcon(statusInfo?.name)}</Suspense>
      <span css={styles.statusText}>{statusInfo?.name || 'Unknown'}</span>
    </span>
  );
};
