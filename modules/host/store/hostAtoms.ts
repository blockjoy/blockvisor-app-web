import { atom } from 'recoil';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { localStorageEffect } from 'utils/store/persist';
import { HOST_PAGINATION_DEFAULT } from '@shared/index';

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

const hostListPagination = atom<Pagination>({
  key: 'host.list.pagination',
  default: HOST_PAGINATION_DEFAULT,
});

const allHosts = atom<Host[]>({
  key: 'host.all',
  default: [],
});

const isLoadingAllHosts = atom<LoadingState>({
  key: 'host.all.loading',
  default: 'initializing',
});

const hostListLoadingState = atom<LoadingState>({
  key: 'host.list.loading',
  default: 'initializing',
});

const filtersTempTotal = atom<number>({
  key: 'host.filters.temp.total',
  default: 0,
});

const hostIpListType = atom<'all' | 'available' | 'assigned'>({
  key: 'host.ipListType',
  default: 'all',
});

const filtersSearchQuery = atom<string>({
  key: 'host.filters.searchQuery',
  default: '',
  effects: [localStorageEffect('host.filters.searchQuery')],
});

export const hostAtoms = {
  activeHost,
  isLoadingActiveHost,

  hostList,
  hostListPagination,
  allHosts,
  isLoadingAllHosts,
  hostCount,
  hostIpListType,
  hostListLoadingState,

  filtersTempTotal,
  filtersSearchQuery,
};
