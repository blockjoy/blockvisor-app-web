import { FC } from 'react';
import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/nodeStatusList';
import { NodeStatusIcon } from './NodeStatusIcon';

export type NodeStatusType = 'container' | 'sync' | 'staking';

export type NodeStatusListItem = {
  id: number;
  name: string;
  type?: NodeStatusType;
};

type Props = {
  status: number;
  type?: NodeStatusType;
  hasBorder?: boolean;
};

export const getNodeStatusInfo = (status: number, type?: NodeStatusType) => {
  const statusInfo = nodeStatusList.find(
    (l) => l.id === status && l.type === type,
  );

  return {
    id: statusInfo?.id,
    name: statusInfo?.name,
    type: statusInfo?.type,
  };
};

export const getNodeStatusColor = (status: number, type?: NodeStatusType) => {
  const statusName = getNodeStatusInfo(status, type)?.name!;

  if (statusName?.match(/RUNNING|SYNCED|SYNCING|FOLLOWER|BROADCASTING/g)) {
    return styles.statusColorGreen;
  } else if (statusName?.match(/UNSPECIFIED|UNDEFINED|STOPPED/g)) {
    return styles.statusColorRed;
  } else {
    return styles.statusColorDefault;
  }
};

export const NodeStatus: FC<Props> = ({ status, type, hasBorder = true }) => {
  const statusInfo = getNodeStatusInfo(status, type);
  return (
    <span
      css={[
        styles.status,
        hasBorder && styles.statusBorder,
        getNodeStatusColor(status, type),
      ]}
    >
      <NodeStatusIcon size="12px" status={status} type={type} />
      <span css={[getNodeStatusColor(status, type)]}>
        {statusInfo?.name || 'Unknown'}
      </span>
    </span>
  );
};
