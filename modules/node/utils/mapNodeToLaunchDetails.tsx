import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ROUTES } from '@shared/constants/routes';
import { NextLink, DateTime } from '@shared/components';
import { OrgUser } from '@modules/grpc/library/blockjoy/v1/org';

export const mapNodeToLaunchDetails = (node: Node, orgUsers?: OrgUser[]) => {
  const launchedBy =
    orgUsers?.find((u) => u.userId === node.createdBy?.resourceId!)?.name ||
    '-';

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
    {
      label: 'Launched By',
      data: launchedBy,
    },
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
