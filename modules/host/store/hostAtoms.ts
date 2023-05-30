import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { hostStatusList } from '@shared/constants/lookups';
import { isMobile } from 'react-device-detect';
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

const hasMoreHosts = atom<boolean>({
  key: 'host.hasMore',
  default: false,
});

const preloadHosts = atom<number>({
  key: 'hosts.loading.total',
  default: 0,
});

const activeListType = atom<string | 'table' | 'grid'>({
  key: 'host.list.type',
  default: 'grid',
});

const isFiltersOpen = atom<boolean>({
  key: 'host.filters.isOpen',
  default: true,
  effects: [
    ({ setSelf }) => {
      if (isMobile) {
        setSelf(false);
        return;
      }

      const savedHostFiltersToggle =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('hostFiltersOpen')
          : null;
      const isFiltersOpenValue = savedHostFiltersToggle
        ? JSON.parse(savedHostFiltersToggle)
        : true;
      setSelf(isFiltersOpenValue);
    },
  ],
});

const filtersStatus = atom<FilterItem[]>({
  key: 'host.filters.status',
  default: hostStatusList
    .filter((item) => item.id !== 0)
    .map((item) => ({
      name: item.name,
      id: item.id?.toString(),
      isChecked: false,
    })),
  effects: [
    ({ setSelf }) => {
      const savedHostFilters =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('hostFilters')
          : null;
      if (savedHostFilters) {
        const savedStatus = JSON.parse(savedHostFilters)['status'];
        if (savedStatus) setSelf(savedStatus);
      }
    },
  ],
});

export const hostAtoms = {
  activeHost,
  isLoadingActiveHost,

  hostList,
  isLoading,

  hasMoreHosts,
  preloadHosts,

  activeListType,

  isFiltersOpen,
  filtersStatus,
};
