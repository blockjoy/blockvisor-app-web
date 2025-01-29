import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ROUTES } from '@shared/constants/routes';
import { NextLink, DateTime, NodeItems } from '@shared/components';

export const mapNodeToLaunchDetails = (node: Node, isSuperUser?: boolean) => {
  const details: { label: string; data: any | undefined }[] = [
    {
      label: 'Host',
      data:
        node.orgId === node.hostOrgId || isSuperUser ? (
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
      data: (
        <NodeItems.CreatedBy
          createdBy={node.createdBy}
          hostId={node.hostId}
          hostDisplayName={node.hostDisplayName}
          hostNetworkName={node.hostNetworkName}
        />
      ),
    },
    {
      label: 'Launched On',
      data: !node.createdAt ? '-' : <DateTime date={node.createdAt} />,
    },
  ];

  if (node?.regionName) {
    details.splice(1, 0, {
      label: 'Region',
      data: node.regionName ?? '-',
    });
  }

  return details;
};
