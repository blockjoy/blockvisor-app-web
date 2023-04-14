import { nodeTypeList } from '@shared/constants/lookups';

export const mapNodeToDetails = (node: BlockjoyNode) => {
  console.log('mapNodeToDetails', node);

  if (!node?.type) {
    return [];
  }

  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'TYPE',
      data: nodeTypeList.find((n) => n.id === node.type)?.name,
    },
    { label: 'HOST', data: node.hostName || 'Unknown' },
    { label: 'NODE ADDRESS', data: node?.address || '-' },
    { label: 'VERSION', data: node.version || 'Latest' },
    { label: 'BLOCK HEIGHT', data: node.blockHeight },
  ];

  return details;
};
