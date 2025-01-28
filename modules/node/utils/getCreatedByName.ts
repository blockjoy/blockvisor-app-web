import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';

type Params = Partial<
  Pick<Node, 'createdBy' | 'hostId' | 'hostDisplayName' | 'hostNetworkName'>
> & {
  defaultOrganization?: DefaultOrganization | null;
  orgs?: Org[];
  nodes?: Node[];
};

export const getCreatedByName = ({
  createdBy,
  hostId,
  hostDisplayName,
  hostNetworkName,
  defaultOrganization,
  orgs,
  nodes,
}: Params): string | null => {
  switch (createdBy?.resourceType) {
    case ResourceType.RESOURCE_TYPE_USER: {
      const org = orgs?.find((org) => org.orgId === defaultOrganization?.orgId);

      const member = org?.members?.find(
        (member) => member.userId === createdBy.resourceId,
      );

      if (member) return member.name;

      break;
    }

    case ResourceType.RESOURCE_TYPE_ORG: {
      const org = orgs?.find((org) => org.orgId === createdBy?.resourceId);

      if (org) return org.name;

      break;
    }

    case ResourceType.RESOURCE_TYPE_HOST: {
      if (hostId === createdBy?.resourceId && hostNetworkName)
        return hostDisplayName ?? hostNetworkName ?? '';

      break;
    }

    case ResourceType.RESOURCE_TYPE_NODE: {
      const node = nodes?.find((node) => node.nodeId === createdBy?.resourceId);

      if (node) return node.displayName;

      break;
    }

    default:
      break;
  }

  return null;
};
