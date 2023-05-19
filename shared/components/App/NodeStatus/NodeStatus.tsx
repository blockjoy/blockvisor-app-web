import { FC } from 'react';
import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/lookups';
import { NodeStatusIcon } from './NodeStatusIcon';

export const getColor = (name: string, isOnline: boolean) => {
  if (name === 'Processing' || name === 'Provisioning') {
    return styles.statusColorGreen;
  }

  if (isOnline) {
    return styles.statusColorDefault;
  } else {
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

        getColor(statusInfo?.name!, statusInfo?.isOnline!),
      ]}
    >
      <NodeStatusIcon size="12px" status={status} />
      <span
        css={[
          styles.statusText,
          getColor(statusInfo?.name!, statusInfo?.isOnline!),
        ]}
      >
        {statusInfo?.name || 'Unknown'}
      </span>
    </span>
  );
};
