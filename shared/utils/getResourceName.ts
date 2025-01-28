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
  orgs?: Org[];
  hosts?: Host[];
  nodes?: Node[];
};

export const getResourceName = ({
  resource,
  user,
  orgs,
  hosts,
  nodes,
}: Params): string | null => {
  switch (resource?.resourceType) {
    case ResourceType.RESOURCE_TYPE_USER: {
      if (user) return `${user.firstName} ${user.lastName}`;

      break;
    }

    case ResourceType.RESOURCE_TYPE_ORG: {
      const org = orgs?.find((org) => org.orgId === resource?.resourceId);

      if (org) return org.name;

      break;
    }

    case ResourceType.RESOURCE_TYPE_HOST: {
      const host = hosts?.find((host) => host.hostId === resource.resourceId);

      if (host) return host.displayName ?? host.networkName;

      break;
    }

    case ResourceType.RESOURCE_TYPE_NODE: {
      const node = nodes?.find((node) => node.nodeId === resource?.resourceId);

      if (node) return node.displayName ?? node.nodeName;

      break;
    }

    default:
      break;
  }

  return null;
};
