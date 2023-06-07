import { Node } from '@modules/grpc/library/blockjoy/v1/node';

var formatter = new Intl.DateTimeFormat('en-US');

export const mapNodeToGeneralDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
    { label: 'CREATED BY', data: node.createdByName || '-' },
    {
      label: 'CREATED ON',
      data: formatter.format(node.createdAt) || '-',
    },
  ];

  return details;
};
