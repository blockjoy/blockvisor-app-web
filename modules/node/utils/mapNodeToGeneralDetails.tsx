import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ROUTES } from '@shared/constants/routes';
import { formatters, NextLink } from '@shared/index';

export const mapNodeToGeneralDetails = (node: Node) => {
  if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'Host',
      data:
        node.orgId === node.hostOrgId ? (
          <NextLink href={ROUTES.HOST(node.hostId)}>{node.hostName}</NextLink>
        ) : (
          node.hostName
        ),
    },
    {
      label: 'Organization',
      data: (
        <NextLink href={ROUTES.ORGANIZATION(node.orgId)}>
          {node.orgName}
        </NextLink>
      ),
    },

    { label: 'Launched By', data: node.createdBy?.name || '-' },
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
