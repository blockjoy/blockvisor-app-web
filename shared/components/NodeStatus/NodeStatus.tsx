import { FC, Suspense } from 'react';
import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/lookups';
import dynamic from 'next/dynamic';

const IconUndefined = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Undefined.svg'),
);
const IconEarning = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Earning.svg'),
);
const IconProcessing = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Processing.svg'),
);
const IconBroadcasting = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Broadcasting.svg'),
);
const IconCancelled = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Cancelled.svg'),
);
const IconDelegating = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Delegating.svg'),
);
const IconDelinquent = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Delinquent.svg'),
);
const IconDisabled = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Disabled.svg'),
);
const IconElected = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Elected.svg'),
);
const IconElecting = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Electing.svg'),
);
const IconExporting = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Exporting.svg'),
);
const IconIngesting = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Ingesting.svg'),
);
const IconMining = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Mining.svg'),
);
const IconMinting = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Minting.svg'),
);
const IconRelaying = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Relaying.svg'),
);
const IconRemoved = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Removed.svg'),
);
const IconRemoving = dynamic(
  () => import('@public/assets/icons/nodeStatusIcons/Removing.svg'),
);

const icons = {
  Undefined: <IconUndefined />,
  Earning: <IconEarning />,
  Processing: <IconProcessing />,
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
