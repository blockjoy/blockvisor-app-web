import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';

export const RESOURCE_TYPE_ITEMS: Array<Item & { value?: ResourceType }> = [
  {
    id: 'user',
    name: 'User',
    value: ResourceType.RESOURCE_TYPE_USER,
  },
  {
    id: 'org',
    name: 'Organization',
    value: ResourceType.RESOURCE_TYPE_ORG,
  },
  {
    id: 'host',
    name: 'Host',
    value: ResourceType.RESOURCE_TYPE_HOST,
  },
  {
    id: 'node',
    name: 'Node',
    value: ResourceType.RESOURCE_TYPE_NODE,
  },
];
