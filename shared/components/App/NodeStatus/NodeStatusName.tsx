import { getNodeStatusInfo, NodeStatusType } from '@shared/components';

type Props = {
  status?: number;
  type?: NodeStatusType;
  protocolStatus?: string;
};

export const NodeStatusName = ({ status, type, protocolStatus }: Props) => {
  const statusName = getNodeStatusInfo(
    status,
    type,
    protocolStatus,
  )?.name?.toLowerCase();

  return <>{statusName?.replace('_', ' ')}</>;
};
