import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { atom } from 'recoil';

const activeHost = atom<Host | null>({
  key: 'host',
  default: null,
});

const isLoadingActiveHost = atom<LoadingState>({
  key: 'host.loading',
  default: 'initializing',
});

const hostList = atom<Host[]>({
  key: 'host.list',
  default: [],
});

const isLoading = atom<LoadingState>({
  key: 'host.list.loading',
  default: 'initializing',
});

const activeListType = atom<string | 'table' | 'grid'>({
  key: 'host.list.type',
  default: 'grid',
});

export const hostAtoms = {
  activeHost,
  isLoadingActiveHost,

  hostList,
  isLoading,

  activeListType,
};
