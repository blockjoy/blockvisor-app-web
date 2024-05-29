import { useRecoilValue } from 'recoil';
import { NodeStatus } from '@modules/grpc/library/blockjoy/common/v1/node';
import { authSelectors } from '@modules/auth';
import { getNodeStatusInfo, NodeStatusType } from '@shared/components';

type Props = {
  status: NodeStatus;
  type?: NodeStatusType;
};

export const NodeStatusName = ({ status, type }: Props) => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const statusInfo = getNodeStatusInfo(status, type);

  let statusName = statusInfo.name?.toLowerCase();

  // TODO: Fix backend to have provisioning status if downloading;

  const isPending = status === NodeStatus.NODE_STATUS_PROVISIONING_PENDING;

  switch (true) {
    case isPending:
      statusName = isSuperUser ? 'Provisioning Pending' : 'Launching';
  }

  return <>{statusName?.replace('_', ' ')}</>;
};
