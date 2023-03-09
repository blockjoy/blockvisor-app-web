import { nodeTypeList } from '@shared/constants/lookups';

export const mapNodeToDetails = (node: BlockjoyNode) => {
  if (!node?.nodeTypeId) {
    return [];
  }

  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'TYPE',
      data: nodeTypeList.find((n) => n.id === node.nodeTypeId)?.name,
    },
    { label: 'HOST', data: node.hostName || 'Unknown' },
    { label: 'NODE ADDRESS', data: node?.address || '-' },
    { label: 'VERSION', data: node.version || 'Latest' },
    { label: 'BLOCK HEIGHT', data: node.blockHeight },
  ];

  return details;
};
