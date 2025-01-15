import {
  NodeHealth,
  NodeState,
} from '@modules/grpc/library/blockjoy/common/v1/node';
import { NodeStatusListItem } from '@shared/components';

export const nodeStatusList: NodeStatusListItem[] = [
  ...Object.entries(NodeState)
    .filter((f) => +f[0] > -1)
    .map(([id, name]) => ({
      id: +id,
      name: name?.toString().replace('NODE_STATE_', ''),
    })),
];

export const nodeHealthList: NodeStatusListItem[] = [
  ...Object.entries(NodeHealth)
    .filter((f) => +f[0] > -1)
    .map(([id, name]) => ({
      id: +id,
      name: name?.toString().replace('NODE_HEALTH_', ''),
    })),
];
