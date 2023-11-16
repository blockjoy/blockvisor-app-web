import { NodeStatus } from '@modules/grpc/library/blockjoy/v1/node';
import { getNodeStatusInfo, NodeStatusType } from '@shared/components';

type Props = {
  status: NodeStatus;
  type?: NodeStatusType;
  downloadingCurrent?: number;
  downloadingTotal?: number;
};

export const NodeStatusName = ({
  status,
  type,
  downloadingCurrent,
  downloadingTotal,
}: Props) => {
  const statusInfo = getNodeStatusInfo(status, type);

  let statusName = statusInfo.name?.toLowerCase();

  const isDownloading =
    status === NodeStatus.NODE_STATUS_PROVISIONING &&
    downloadingCurrent! !== downloadingTotal!;

  const isPending = status === NodeStatus.NODE_STATUS_PROVISIONING_PENDING;

  switch (true) {
    case isDownloading:
      statusName = 'Downloading';
      break;
    case isPending:
      statusName = 'Launching';
  }

  return <>{statusName}</>;
};
