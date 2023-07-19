import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ROUTES } from '@shared/constants/routes';
import Link from 'next/link';

var formatter = new Intl.DateTimeFormat('en-US');

export const mapNodeToGeneralDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'Region',
      data: node.placement?.scheduler?.region ?? '-',
    },
    {
      label: 'Host',
      data:
        node.orgId === node.hostOrgId ? (
          <Link href={ROUTES.HOST(node.hostId)}>{node.hostName}</Link>
        ) : (
          node.hostName
        ),
    },
    {
      label: 'Organization',
      data: <Link href={ROUTES.ORGANIZATION(node.orgId)}>{node.orgName}</Link>,
    },

    { label: 'Launched By', data: node.createdByName || '-' },
    {
      label: 'Launched On',
      data: formatter.format(node.createdAt) || '-',
    },
  ];

  return details;
};
