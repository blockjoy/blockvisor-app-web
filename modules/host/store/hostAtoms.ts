import { atom } from 'recoil';
import { localStorageEffect } from 'utils/store/persist';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { UIHostFilterCriteria } from '@modules/grpc/clients/hostClient';
import { HOST_FILTERS_DEFAULT } from '@shared/constants/lookups';

const defaultHost = atom<Host | null>({
  key: 'host.default',
  default: null,
  effects: [localStorageEffect('defaultHost')],
});

const activeHost = atom<Host | null>({
  key: 'host',
  default: null,
});

const hostCount = atom<number>({
  key: 'host.count',
  default: 0,
});

const isLoadingActiveHost = atom<LoadingState>({
  key: 'host.loading',
  default: 'initializing',
});

const hostList = atom<Host[]>({
  key: 'host.list',
  default: [],
});

const allHosts = atom<Host[]>({
  key: 'host.all',
  default: [],
});

const isLoadingAllHosts = atom<LoadingState>({
  key: 'host.all.loading',
  default: 'initializing',
});

const isLoading = atom<LoadingState>({
  key: 'host.list.loading',
  default: 'initializing',
});

const filters = atom<UIHostFilterCriteria>({
  key: 'host.filters',
  default: HOST_FILTERS_DEFAULT,
  effects: [localStorageEffect('host.filters')],
});

const filtersTempTotal = atom<number>({
  key: 'host.filters.temp.total',
  default: 0,
});

const hostIpListType = atom<'all' | 'available' | 'assigned'>({
  key: 'host.ipListType',
  default: 'all',
});

export const hostAtoms = {
  defaultHost,

  activeHost,
  isLoadingActiveHost,

  hostList,
  allHosts,
  isLoadingAllHosts,
  hostCount,
  hostIpListType,
  isLoading,

  filters,
  filtersTempTotal,
};
