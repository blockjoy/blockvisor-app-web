import { getNodeStatusInfo, NodeStatusType } from '@shared/components';

type Props = {
  status: number;
  type?: NodeStatusType;
};

export const NodeStatusName = ({ status, type }: Props) => {
  const statusInfo = getNodeStatusInfo(status);

  let statusName = statusInfo.name?.toLowerCase();

  return <>{statusName?.replace('_', ' ')}</>;
};
