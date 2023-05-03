import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const mapNodeToDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
    { label: 'HOST', data: node.hostName || 'Unknown' },
    { label: 'VERSION', data: node.version || 'Latest' },
    { label: 'BLOCK HEIGHT', data: node.blockHeight || '-' },
    { label: 'IP ADDRESS', data: node.ip || '-' },
    { label: 'CREATED BY', data: node.createdByName || '-' },
    { label: 'NODE ADDRESS', data: node.address || '-' },
  ];

  return details;
};
