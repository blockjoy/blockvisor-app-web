import { HostStatus } from '@modules/grpc/library/blockjoy/v1/host';

export const hostStatusList = Object.entries(HostStatus)
  .filter((f) => +f[0] > -1)
  .map(([id, name]) => ({
    id: +id,
    name: name?.toString().replace('HOST_STATUS_', ''),
  }));
