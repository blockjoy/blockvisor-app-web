import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  getNodeStatusColor,
  getNodeStatusInfo,
  NodeStatusType,
} from './NodeStatus';

import { SvgIcon } from '@shared/components';

const IconNode = dynamic(() => import('@public/assets/icons/app/Node.svg'));

const NodeStatusSpinner = dynamic(() => import('./NodeStatusSpinner'));

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
const IconSynced = dynamic(
  () => import('@public/assets/icons/nodeStatus/Synced.svg'),
);
const IconStopped = dynamic(
  () => import('@public/assets/icons/nodeStatus/Stopped.svg'),
);
const IconUnspecified = dynamic(
  () => import('@public/assets/icons/nodeStatus/Unspecified.svg'),
);
const IconRunning = dynamic(
  () => import('@public/assets/icons/nodeStatus/Running.svg'),
);
const IconSyncing = dynamic(
  () => import('@public/assets/icons/nodeStatus/Syncing.svg'),
);

const getIcon = (statusName: string) => {
  if (statusName?.match(/SYNCED|FOLLOWER/g)) {
    return <IconSynced />;
  } else if (statusName?.match(/STOPPED/g)) {
    return <IconStopped />;
  } else if (statusName?.match(/UNSPECIFIED|UNDEFINED|SYNCED|STOPPED/g)) {
    return <IconUnspecified />;
  } else {
    switch (statusName) {
      case 'EARNING':
        return <IconEarning />;
      case 'BROADCASTING':
        return <IconBroadcasting />;
      case 'CANCELLED':
        return <IconCancelled />;
      case 'DELEGATING':
        return <IconDelegating />;
      case 'DELINQUENT':
        return <IconDelinquent />;
      case 'DISABLED':
        return <IconDisabled />;
      case 'ELECTED':
        return <IconElected />;
      case 'ELECTING':
        return <IconElecting />;
      case 'EXPORTING':
        return <IconExporting />;
      case 'INGESTING':
        return <IconIngesting />;
      case 'MINING':
        return <IconMining />;
      case 'MINTING':
        return <IconMinting />;
      case 'RELAYING':
        return <IconRelaying />;
      case 'REMOVED':
        return <IconRemoved />;
      case 'REMOVING':
        return <IconRemoving />;
      case 'RUNNING':
        return <IconRunning />;
      case 'SYNCING':
        return <IconSyncing />;
      default:
        return <IconProcessing />;
    }
  }
};

type NodeStatusIconProps = {
  status?: number;
  type?: NodeStatusType;
  size: string;
};

export const NodeStatusIcon = ({
  status,
  type,
  size = '24px',
}: NodeStatusIconProps) => {
  const statusName = getNodeStatusInfo(status!, type)?.name;

  return (
    <Suspense fallback={null}>
      {statusName === 'PROVISIONING' ? (
        <NodeStatusSpinner size={size} />
      ) : (
        <SvgIcon
          additionalStyles={[getNodeStatusColor(status!, type)]}
          size={size}
        >
          {status === undefined ? <IconNode /> : getIcon(statusName!)}
        </SvgIcon>
      )}
    </Suspense>
  );
};
