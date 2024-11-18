import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ROUTES } from '@shared/constants/routes';
import { NextLink, DateTime } from '@shared/components';

export const mapNodeToLaunchDetails = (node: Node) => {
  // if (!node?.nodeType) return [];

  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'Host',
      data:
        node.orgId === node.hostOrgId ? (
          <NextLink href={ROUTES.HOST(node.hostId)}>
            {node.hostDisplayName}
          </NextLink>
        ) : (
          node.hostDisplayName
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
    // TODO: createdBy name is missing
    { label: 'Launched By', data: node.createdBy?.resourceId || '-' },
    {
      label: 'Launched On',
      data: !node.createdAt ? '-' : <DateTime date={node.createdAt} />,
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
