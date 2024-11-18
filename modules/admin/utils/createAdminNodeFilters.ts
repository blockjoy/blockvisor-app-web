import { createAdminFilterList } from './createAdminFilterList';

export const createAdminNodeFilters = (filters: AdminListColumn[]) => ({
  blockchain: createAdminFilterList(filters!, 'protocolName'),
  nodeStatus: createAdminFilterList(filters!, 'status'),
  containerStatus: createAdminFilterList(filters!, 'containerStatus'),
  syncStatus: createAdminFilterList(filters!, 'syncStatus'),
  nodeType: createAdminFilterList(filters!, 'nodeType'),
  orgIds: createAdminFilterList(filters!, 'orgName'),
  userIds: createAdminFilterList(filters!, 'createdBy'),
  hostIds: createAdminFilterList(filters!, 'host'),
  regions: createAdminFilterList(filters!, 'region'),
  ips: createAdminFilterList(filters!, 'ip'),
  networks: createAdminFilterList(filters!, 'network'),
  versions: createAdminFilterList(filters!, 'version'),
});
