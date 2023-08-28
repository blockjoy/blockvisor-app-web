import {
  NodeStatus,
  ContainerStatus,
  SyncStatus,
  StakingStatus,
} from '@modules/grpc/library/blockjoy/v1/node';
import { NodeStatusListItem } from '@shared/components';

export const nodeStatusList: NodeStatusListItem[] = [
  ...Object.entries(NodeStatus)
    .filter((f) => +f[0] > -1)
    .map(([id, name]) => ({
      id: +id,
      name: name?.toString().replace('NODE_STATUS_', ''),
    })),
  ...Object.entries(ContainerStatus)
    .filter((f) => +f[0] > -1)
    .map(([id, name]) => ({
      id: +id,
      name: name?.toString().replace('CONTAINER_STATUS_', ''),
      type: 'container',
    })),
  ...Object.entries(SyncStatus)
    .filter((f) => +f[0] > -1)
    .map(([id, name]) => ({
      id: +id,
      name: name?.toString().replace('SYNC_STATUS_', ''),
      type: 'sync',
    })),
  ...Object.entries(StakingStatus)
    .filter((f) => +f[0] > -1)
    .map(([id, name]) => ({
      id: +id,
      name: name?.toString().replace('STAKING_STATUS_', ''),
      type: 'staking',
    })),
];
