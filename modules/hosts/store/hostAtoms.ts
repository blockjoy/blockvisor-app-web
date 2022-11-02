import { GrpcHostObject } from '@modules/client/grpc_client';
import { atom } from 'recoil';

export const bla = '';

const host = atom<Host | null>({
  key: 'host.single',
  default: null,
});
const hostLoading = atom<boolean | null>({
  key: 'host.loading',
  default: null,
});

const hosts = atom<GrpcHostObject[]>({
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
