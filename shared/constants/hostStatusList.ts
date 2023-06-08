import { HostStatus } from '@modules/grpc/library/blockjoy/v1/host';

export const hostStatusList = Object.entries(HostStatus)
  .filter((f) => +f[0] > -1)
  .map(([id, name]) => ({
    id: +id,
    name: name?.toString().replace('HOST_STATUS_', ''),
  }));

// export const hostStatusList = [
//   { id: 0, name: 'Undefined', uuid: 'undefined' },
//   { id: 1, name: 'Creating', uuid: 'creating' },
//   { id: 2, name: 'Running', uuid: 'running' },
//   { id: 3, name: 'Starting', uuid: 'starting' },
//   { id: 4, name: 'Stopping', uuid: 'stopping' },
//   { id: 5, name: 'Stopped', uuid: 'stopped' },
//   { id: 6, name: 'Upgrading', uuid: 'upgrading' },
//   { id: 7, name: 'Upgraded', uuid: 'uprgraded' },
//   { id: 8, name: 'Deleting', uuid: 'deleting' },
//   { id: 9, name: 'Deleted', uuid: 'deleted' },
//   { id: 10, name: 'Installing', uuid: 'installing' },
//   { id: 11, name: 'Snaphotting', uuid: 'snaphotting' },
// ];
