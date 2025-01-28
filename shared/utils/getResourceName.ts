import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import {
  Resource,
  ResourceType,
} from '@modules/grpc/library/blockjoy/common/v1/resource';

type Params = {
  resource?: Resource;
  user?: User | null;
  allOrganizations?: Org[];
  allNodes?: Node[];
  allHosts?: Host[];
};

export const getResourceName = ({
  resource,
  user,
  allOrganizations,
  allNodes,
  allHosts,
}: Params): string | null => {
  switch (resource?.resourceType) {
    case ResourceType.RESOURCE_TYPE_USER: {
      if (user) return `${user.firstName} ${user.lastName}`;

      break;
    }

    case ResourceType.RESOURCE_TYPE_ORG: {
      const org = allOrganizations?.find(
        (org) => org.orgId === resource?.resourceId,
      );

      if (org) return org.name;

      break;
    }

    case ResourceType.RESOURCE_TYPE_HOST: {
      const host = allHosts?.find(
        (host) => host.hostId === resource.resourceId,
      );

      if (host) return host.displayName ?? host.networkName;

      break;
    }

    case ResourceType.RESOURCE_TYPE_NODE: {
      const node = allNodes?.find(
        (node) => node.nodeId === resource?.resourceId,
      );

      if (node) return node.displayName ?? node.nodeName;

      break;
    }

    default:
      break;
  }

  return null;
};
