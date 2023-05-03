import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const mapNodeToDashboardDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
    { label: 'HOST', data: node.hostName || 'Unknown' },
    { label: 'VERSION', data: node.version || 'Latest' },
    { label: 'BLOCK HEIGHT', data: node.blockHeight || '-' },
  ];

  return details;
};
