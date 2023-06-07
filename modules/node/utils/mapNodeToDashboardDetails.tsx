import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ROUTES } from '@shared/constants/routes';
import Link from 'next/link';

export const mapNodeToDashboardDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'HOST',
      data:
        <Link href={ROUTES.HOST(node.hostId)}>{node.hostName}</Link> ||
        'Unknown',
    },
    { label: 'VERSION', data: node.version || 'Latest' },
    { label: 'NODE ADDRESS', data: node.address || '-' },
  ];

  return details;
};
