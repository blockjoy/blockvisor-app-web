import { NodeType } from '@modules/grpc/library/blockjoy/v1/node';

export const convertNodeTypeToName = (nodeType: NodeType) =>
  NodeType[nodeType].replace('NODE_TYPE_', '').toLowerCase();
