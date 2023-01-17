import { FC } from 'react';
import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/lookups';

import IconUndefined from 'public/assets/icons/nodeStatusIcons/Undefined.svg';
import IconEarning from 'public/assets/icons/nodeStatusIcons/Earning.svg';
import IconProcessing from 'public/assets/icons/nodeStatusIcons/Processing.svg';
import IconBroadcasting from 'public/assets/icons/nodeStatusIcons/Broadcasting.svg';
import IconCancelled from 'public/assets/icons/nodeStatusIcons/Cancelled.svg';
import IconDelegating from 'public/assets/icons/nodeStatusIcons/Delegating.svg';
import IconDelinquent from 'public/assets/icons/nodeStatusIcons/Delinquent.svg';
import IconDisabled from 'public/assets/icons/nodeStatusIcons/Disabled.svg';
import IconElected from 'public/assets/icons/nodeStatusIcons/Elected.svg';
import IconElecting from 'public/assets/icons/nodeStatusIcons/Electing.svg';
import IconExporting from 'public/assets/icons/nodeStatusIcons/Exporting.svg';
import IconIngesting from 'public/assets/icons/nodeStatusIcons/Ingesting.svg';
import IconMining from 'public/assets/icons/nodeStatusIcons/Mining.svg';
import IconMinting from 'public/assets/icons/nodeStatusIcons/Minting.svg';
import IconRelaying from 'public/assets/icons/nodeStatusIcons/Relaying.svg';
import IconRemoved from 'public/assets/icons/nodeStatusIcons/Removed.svg';
import IconRemoving from 'public/assets/icons/nodeStatusIcons/Removing.svg';

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
  if (name === 'Processing') {
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
      {getIcon(statusInfo?.name)}
      <span css={styles.statusText}>{statusInfo?.name || 'Unknown'}</span>
    </span>
  );
};
