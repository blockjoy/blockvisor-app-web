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
};

const getIcon = (name: string = '') => {
  return icons[name];
};

type Props = {
  status: number;
  hasBorder?: boolean;
};

export const NodeStatus: FC<Props> = ({ status, hasBorder }) => {
  const statusInfo = nodeStatusList.find((s) => s.id === status);

  return (
    <span css={[styles.status, hasBorder && styles.statusBorder]}>
      {getIcon(statusInfo?.name)}
      <span css={styles.statusText}>{statusInfo?.name || 'Unknown'}</span>
    </span>
  );
};
