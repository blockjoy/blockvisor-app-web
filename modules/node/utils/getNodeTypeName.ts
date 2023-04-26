import { nodeTypeList } from '@shared/constants/lookups';
import { SupportedNodeType } from '@modules/grpc/library/blockchain';

export function getNodeTypeName(type: SupportedNodeType) {
  return nodeTypeList.find((n) => n.id === type.nodeType)?.name;
}
