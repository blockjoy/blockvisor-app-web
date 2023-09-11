import { FC } from 'react';
import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/nodeStatusList';
import { NodeStatusIcon } from './NodeStatusIcon';
import { NodeStatusLoader } from './NodeStatusLoader';
import { NodeStatus as NodeStatusEnum } from '@modules/grpc/library/blockjoy/v1/node';

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
  loadingCurrent?: number;
  loadingTotal?: number;
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

  if (
    statusName?.match(
      /RUNNING|SYNCED|SYNCING|FOLLOWER|BROADCASTING|PROVISIONING/g,
    )
  ) {
    return styles.statusColorGreen;
  } else if (statusName?.match(/UNSPECIFIED|UNDEFINED|STOPPED/g)) {
    return styles.statusColorRed;
  } else {
    return styles.statusColorDefault;
  }
};

export const NodeStatus: FC<Props> = ({
  status,
  type,
  hasBorder = true,
  loadingCurrent,
  loadingTotal,
}) => {
  const statusInfo = getNodeStatusInfo(status, type);
  const isLoading =
    status === NodeStatusEnum.NODE_STATUS_PROVISIONING &&
    loadingCurrent! !== loadingTotal!;

  const statusName = isLoading
    ? loadingCurrent === loadingTotal
      ? 'PROVISIONING'
      : 'DOWNLOADING'
    : statusInfo.name;

  return (
    <span
      css={[
        styles.status,
        hasBorder && styles.statusBorder,
        isLoading && styles.statusLoading,
        getNodeStatusColor(status, type),
      ]}
    >
      {isLoading && (
        <NodeStatusLoader current={loadingCurrent!} total={loadingTotal!} />
      )}
      <NodeStatusIcon size="12px" status={status} type={type} />
      <p css={[styles.statusText, getNodeStatusColor(status, type)]}>
        {statusName}
      </p>
    </span>
  );
};
