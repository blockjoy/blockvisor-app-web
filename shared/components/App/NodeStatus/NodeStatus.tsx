import { styles } from './NodeStatus.styles';
import { nodeStatusList } from '@shared/constants/nodeStatusList';
import { NodeStatusIcon } from './NodeStatusIcon';
import { NodeStatusLoader } from './NodeStatusLoader';
import { NodeStatusName } from './NodeStatusName';
import { NodeStatus as NodeStatusEnum } from '@modules/grpc/library/blockjoy/common/v1/node';

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
  downloadingCurrent?: number;
  downloadingTotal?: number;
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
      /RUNNING|SYNCED|SYNCING|FOLLOWER|BROADCASTING|PROVISIONING|UPDATING/g,
    )
  ) {
    return styles.statusColorGreen;
  } else if (statusName?.match(/UNSPECIFIED|UNDEFINED|STOPPED|DELETE|/g)) {
    return styles.statusColorRed;
  } else {
    return styles.statusColorDefault;
  }
};

export const NodeStatus = ({
  status,
  type,
  hasBorder = true,
  downloadingCurrent,
  downloadingTotal,
}: Props) => {
  // TODO: Fix backend to have provisioning status if downloading
  const isDownloading =
    // status === NodeStatus.NODE_STATUS_PROVISIONING &&
    downloadingCurrent! !== downloadingTotal!;
  const nodeStatus = isDownloading
    ? NodeStatusEnum.NODE_STATUS_PROVISIONING
    : status;

  const statusColor = getNodeStatusColor(nodeStatus, type);

  return (
    <span
      css={[
        styles.status,
        hasBorder && styles.statusBorder,
        isDownloading && styles.statusLoading,
        statusColor,
      ]}
    >
      {isDownloading && (
        <NodeStatusLoader
          current={downloadingCurrent!}
          total={downloadingTotal!}
        />
      )}
      <NodeStatusIcon size="12px" status={nodeStatus} type={type} />
      <p css={[styles.statusText, statusColor]}>
        <NodeStatusName
          status={status}
          type={type}
          downloadingCurrent={downloadingCurrent}
          downloadingTotal={downloadingTotal}
        />
      </p>
    </span>
  );
};
