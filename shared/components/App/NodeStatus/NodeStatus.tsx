import { FC } from 'react';
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

export const NodeStatus: FC<Props> = ({
  status,
  type,
  hasBorder = true,
  downloadingCurrent,
  downloadingTotal,
}) => {
  const isDownloading =
    status === NodeStatusEnum.NODE_STATUS_PROVISIONING &&
    downloadingCurrent! !== downloadingTotal!;

  return (
    <span
      css={[
        styles.status,
        hasBorder && styles.statusBorder,
        isDownloading && styles.statusLoading,
        getNodeStatusColor(status, type),
      ]}
    >
      {isDownloading && (
        <NodeStatusLoader
          current={downloadingCurrent!}
          total={downloadingTotal!}
        />
      )}
      <NodeStatusIcon size="12px" status={status} type={type} />
      <p css={[styles.statusText, getNodeStatusColor(status, type)]}>
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
