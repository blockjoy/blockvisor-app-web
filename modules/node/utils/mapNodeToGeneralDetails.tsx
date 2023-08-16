import Link from 'next/link';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ROUTES } from '@shared/constants/routes';
import { formatters } from '@shared/index';

export const mapNodeToGeneralDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
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
      data: !node.createdAt
        ? '-'
        : `${formatters.formatDate(node.createdAt)} @ ${formatters.formatDate(
            node.createdAt,
            'time',
          )}`,
    },
  ];

  if (node?.placement?.scheduler?.region) {
    details.splice(1, 0, {
      label: 'Region',
      data: node.placement?.scheduler?.region ?? '-',
    });
  }

  return details;
};
