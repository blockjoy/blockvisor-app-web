import { usePermissions } from '@modules/auth';
import { NodeStatus } from '@modules/grpc/library/blockjoy/common/v1/node';
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
  const { isSuperUser } = usePermissions();

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
      statusName = isSuperUser ? 'Provisioning Pending' : 'Launching';
  }

  return <>{statusName?.replace('_', ' ')}</>;
};
