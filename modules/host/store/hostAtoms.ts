import { localStorageEffect } from 'utils/store/persist';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { hostFiltersDefaults } from '@shared/constants/lookups';
import { isMobile } from 'react-device-detect';
import { atom } from 'recoil';

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

const isLoading = atom<LoadingState>({
  key: 'host.list.loading',
  default: 'initializing',
});

const activeListType = atom<string | 'table' | 'grid'>({
  key: 'host.list.type',
  default: 'table',
});

const isFiltersOpen = atom<boolean>({
  key: 'host.filters.isOpen',
  default: false,
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

const filtersMemory = atom<[number, number]>({
  key: 'host.filters.memory',
  default: hostFiltersDefaults.memory,
  effects: [
    ({ setSelf }) => {
      const savedHostFilters =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('hostFilters')
          : null;
      if (savedHostFilters) {
        const savedMemory = JSON.parse(savedHostFilters)['memory'];
        if (savedMemory) setSelf(savedMemory);
      }
    },
  ],
});

const filtersCPU = atom<[number, number]>({
  key: 'host.filters.cpu',
  default: hostFiltersDefaults.cpu,
  effects: [
    ({ setSelf }) => {
      const savedHostFilters =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('hostFilters')
          : null;
      if (savedHostFilters) {
        const savedCPU = JSON.parse(savedHostFilters)['cpu'];
        if (savedCPU) setSelf(savedCPU);
      }
    },
  ],
});

const filtersSpace = atom<[number, number]>({
  key: 'host.filters.space',
  default: hostFiltersDefaults.space,
  effects: [
    ({ setSelf }) => {
      const savedHostFilters =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('hostFilters')
          : null;
      if (savedHostFilters) {
        const savedSpace = JSON.parse(savedHostFilters)['space'];
        if (savedSpace) setSelf(savedSpace);
      }
    },
  ],
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
  hostCount,
  hostIpListType,
  isLoading,

  activeListType,

  isFiltersOpen,
  filtersMemory,
  filtersCPU,
  filtersSpace,
};
