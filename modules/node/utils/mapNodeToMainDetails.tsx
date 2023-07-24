import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ROUTES } from '@shared/constants/routes';
import Link from 'next/link';

export const mapNodeToMainDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'HOST',
      data:
        node.orgId === node.hostOrgId ? (
          <Link href={ROUTES.HOST(node.hostId)}>{node.hostName}</Link>
        ) : (
          node.hostName
        ),
    },
    { label: 'NODE ADDRESS', data: node.address || '-' },
    {
      label: 'BLOCK HEIGHT',
      data: node?.blockHeight?.toLocaleString('en-US') ?? '-',
    },
    { label: 'IP ADDRESS', data: node.ip || '-' },
  ];

  return details;
};
