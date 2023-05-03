import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { nodeTypeList } from '@shared/constants/lookups';

export const mapNodeToDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'TYPE',
      data: nodeTypeList.find((n) => n.id === node.nodeType)?.name,
    },
    { label: 'HOST', data: node.hostName || 'Unknown' },
    { label: 'NODE ADDRESS', data: node?.address || '-' },
    { label: 'VERSION', data: node.version || 'Latest' },
    { label: 'BLOCK HEIGHT', data: node.blockHeight || '-' },
  ];

  return details;
};
