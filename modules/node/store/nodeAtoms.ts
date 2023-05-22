import { atom, selector } from 'recoil';
import { nodeStatusList, nodeTypeList } from '@shared/constants/lookups';
import { blockchainsAtoms } from './blockchains';
import { isMobile } from 'react-device-detect';
import { localStorageEffect } from 'utils/store/persist';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export type FilterItem = {
  name?: string | undefined;
  id?: string | undefined;
  isChecked?: boolean | undefined;
  isOnline?: boolean | undefined;
};

const activeNode = atom<Node | null>({
  key: 'node.activeNode',
  default: null,
});

const activeListType = atom<string | 'table' | 'grid'>({
  key: 'node.activeListType',
  default: 'grid',
});

const nodeList = atom<Node[]>({
  key: 'node.nodeList',
  default: [],
  effects: [localStorageEffect('nodeList')],
});

const isLoading = atom<LoadingState>({
  key: 'node.loading',
  default: 'initializing',
});

const isLoadingActiveNode = atom<boolean>({
  key: 'node.loadingActiveNode',
  default: true,
});

const isFiltersOpen = atom<boolean>({
  key: 'node.isFiltersOpen',
  default: true,
  effects: [
    ({ setSelf }) => {
      if (isMobile) {
        setSelf(false);
        return;
      }

      const savedNodeFiltersToggle =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('nodeFiltersOpen')
          : null;
      const isFiltersOpenValue = savedNodeFiltersToggle
        ? JSON.parse(savedNodeFiltersToggle)
        : false;
      setSelf(isFiltersOpenValue);
    },
  ],
});

const filtersBlockchain = atom({
  key: 'blockchains.filters',
  default: selector({
    key: 'blockchains.filters/Default',
    get: ({ get }) => {
      const blockchainsAll = get(blockchainsAtoms.blockchains);

      const mappedBlockchains: FilterItem[] = blockchainsAll?.map((b) => ({
        id: b.id,
        name: b.name,
        isChecked: false,
      }));

      return mappedBlockchains;
    },
  }),
  effects: [
    ({ setSelf }) => {
      const savedNodeFilters =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('nodeFilters')
          : null;
      if (savedNodeFilters) {
        const savedBlockchain = JSON.parse(savedNodeFilters)['blockchain'];
        if (savedBlockchain) setSelf(savedBlockchain);
      }
    },
  ],
});

const filtersBlockchainTotal = selector<number>({
  key: 'node.filtersBlockchainTotal',
  get: ({ get }) => {
    const filtersBlockchainAll = get(filtersBlockchain);
    const filtersBlockchainTotal = filtersBlockchainAll?.filter(
      (item) => item.isChecked,
    ).length;

    return filtersBlockchainTotal;
  },
});

const filtersType = atom<FilterItem[]>({
  key: 'node.filtersType',
  default: nodeTypeList.map((item) => ({
    name: item.name,
    id: item.id.toString()!,
    isChecked: false,
  })),
  effects: [
    ({ setSelf }) => {
      const savedNodeFilters =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('nodeFilters')
          : null;
      if (savedNodeFilters) {
        const savedType = JSON.parse(savedNodeFilters)['type'];
        if (savedType) setSelf(savedType);
      }
    },
  ],
});

const filtersTypeTotal = selector<number>({
  key: 'node.filtersTypeTotal',
  get: ({ get }) => {
    const filtersTypeAll = get(filtersType);
    const filtersTypeTotal = filtersTypeAll?.filter(
      (item) => item.isChecked,
    ).length;
    return filtersTypeTotal;
  },
});

const filtersStatus = atom<FilterItem[]>({
  key: 'node.filtersStatus',
  default: nodeStatusList
    .filter((item) => item.id !== 0)
    .map((item) => ({
      name: item.name,
      id: item.name.toString().toLowerCase()!,
      isChecked: false,
      isOnline: item.isOnline,
    })),
  effects: [
    ({ setSelf }) => {
      const savedNodeFilters =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('nodeFilters')
          : null;
      if (savedNodeFilters) {
        const savedStatus = JSON.parse(savedNodeFilters)['status'];
        if (savedStatus) setSelf(savedStatus);
      }
    },
  ],
});

const filtersStatusTotal = selector<number>({
  key: 'node.filtersStatusTotal',
  get: ({ get }) => {
    const filtersStatusAll = get(filtersStatus);
    const filtersStatusTotal = filtersStatusAll?.filter(
      (item) => item.isChecked,
    ).length;
    return filtersStatusTotal;
  },
});

const filtersHealth = atom<string | 'online' | 'offline' | null>({
  key: 'node.filtersHealth',
  default: null,
  effects: [
    ({ setSelf }) => {
      const savedNodeFilters =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('nodeFilters')
          : null;
      if (savedNodeFilters) {
        const savedHealth = JSON.parse(savedNodeFilters)['health'];
        if (savedHealth) setSelf(savedHealth);
      }
    },
  ],
});

const filtersTotal = selector<number>({
  key: 'node.filtersTotal',
  get: ({ get }) => {
    const filtersBlockchainTotal = get(filtersBlockchain).some(
      (s) => s.isChecked,
    );
    const filtersTypeTotal = get(filtersType).some((s) => s.isChecked);
    const filtersStatusTotal = get(filtersStatus).some((s) => s.isChecked);
    const filtersHealthTotal = get(filtersHealth) ? true : false;

    const total =
      [
        filtersBlockchainTotal,
        filtersTypeTotal,
        filtersStatusTotal,
        filtersHealthTotal,
      ].filter(Boolean).length + 1;

    return total;
  },
});

const filtersAll = selector<FilterItem[] | null>({
  key: 'node.filtersAll',
  get: () => {
    const savedNodeFilters =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('nodeFilters')
        : null;
    if (savedNodeFilters) {
      const savedFilters = JSON.parse(savedNodeFilters);
      if (savedFilters) return savedFilters;
    }
  },
});

const nodeWizardActive = atom<boolean>({
  key: 'nodeWizard.active',
  default: false,
});

const hasMoreNodes = atom<boolean>({
  key: 'node.hasMore',
  default: false,
});

const nodeMetricsLoadingState = atom<any>({
  key: 'node.metricsLoadingState',
  default: 'initializing',
});
const nodeMetrics = atom<any>({
  key: 'node.metrics',
  default: {},
});

const totalNodes = atom<number | null>({
  key: 'node.total',
  default: null,
});

const preloadNodes = atom<number>({
  key: 'node.loadingTotal',
  default: 0,
});

export const nodeAtoms = {
  activeNode,
  nodeList,
  isLoading,
  isLoadingActiveNode,
  isFiltersOpen,
  activeListType,
  filtersHealth,
  filtersBlockchain,
  filtersBlockchainTotal,
  filtersStatus,
  filtersStatusTotal,
  filtersType,
  filtersTypeTotal,
  filtersTotal,
  filtersAll,
  nodeWizardActive,
  hasMoreNodes,
  nodeMetrics,
  nodeMetricsLoadingState,
  totalNodes,
  preloadNodes,
};
