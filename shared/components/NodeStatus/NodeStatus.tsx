import { FC } from 'react';
import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/lookups';

import IconUndefined from 'public/assets/icons/nodeStatusIcons/Undefined.svg';
import IconEarning from 'public/assets/icons/nodeStatusIcons/Earning.svg';
import IconProcessing from 'public/assets/icons/nodeStatusIcons/Processing.svg';

const icons = {
  Undefined: <IconUndefined />,
  Earning: <IconEarning />,
  Processing: <IconProcessing />,
  Provisioning: <IconProcessing />,
};

const getIcon = (name: string = '') => {
  return icons[name];
};

const getColor = (name: string) => {
  switch (name) {
    case 'Earning':
      return styles.statusColorGreen;
    case 'Undefined':
      return styles.statusColorRed;
    default:
      return styles.statusColorDefault;
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
        getColor(statusInfo?.name!),
      ]}
    >
      {getIcon(statusInfo?.name)}
      <span css={styles.statusText}>{statusInfo?.name || 'Unknown'}</span>
    </span>
  );
};
