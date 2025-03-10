import { createAdminFilterList } from './createAdminFilterList';

export const createAdminNodeFilters = (filters: AdminListColumn[]) => ({
  protocol: createAdminFilterList(filters!, 'protocolName'),
  nodeStatus: createAdminFilterList(filters!, 'nodeState'),
  orgIds: createAdminFilterList(filters!, 'orgName'),
  userIds: createAdminFilterList(filters!, 'createdBy'),
  hostIds: createAdminFilterList(filters!, 'host'),
  regions: createAdminFilterList(filters!, 'region'),
  ips: createAdminFilterList(filters!, 'ipAddress'),
  networks: createAdminFilterList(filters!, 'network'),
  semanticVersions: createAdminFilterList(filters!, 'semanticVersion'),
  versionKeys: createAdminFilterList(filters!, 'versionKeys'),
});
