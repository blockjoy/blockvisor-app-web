import {
  getNodeHealthInfo,
  getNodeStatusInfo,
  NodeStatusType,
} from '@shared/components';

type Props = {
  status: number;
  type?: NodeStatusType;
};

export const NodeStatusName = ({ status, type }: Props) => {
  const statusInfo =
    type === 'protocol' ? getNodeHealthInfo(status) : getNodeStatusInfo(status);

  let statusName = statusInfo.name?.toLowerCase();

  return <>{statusName?.replace('_', ' ')}</>;
};
