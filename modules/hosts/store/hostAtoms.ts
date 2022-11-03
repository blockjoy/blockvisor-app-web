import { GrpcHostObject } from '@modules/client/grpc_client';
import { atom } from 'recoil';

export const bla = '';

const host = atom<GrpcHostObject | null>({
  key: 'host.single',
  default: null,
});
const hostLoading = atom<LoadingState>({
  key: 'host.loading',
  default: 'initializing',
});

const hosts = atom<Host[]>({
  key: 'hosts.list',
  default: [],
});

const hostsLoading = atom<LoadingState>({
  key: 'hosts.loading',
  default: 'initializing',
});

const hostProvisionKeys = atom<string[]>({
  key: 'hosts.provisionKeys',
  default: [],
});

export const hostsAtoms = {
  host,
  hostLoading,
  hosts,
  hostsLoading,
  hostProvisionKeys,
};
