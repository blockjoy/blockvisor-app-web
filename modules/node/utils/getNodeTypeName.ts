import { SupportedNodeType } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { nodeTypeList } from '@shared/constants/lookups';

export function getNodeTypeName(type: SupportedNodeType) {
  return nodeTypeList.find((n) => n.id === type.nodeType)?.name;
}
