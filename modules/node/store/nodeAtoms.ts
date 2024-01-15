import { atom, selector } from 'recoil';
import { isMobile } from 'react-device-detect';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { nodeTypeList } from '@shared/constants/lookups';
import { nodeStatusList } from '@shared/constants/nodeStatusList';
import { blockchainAtoms } from '@modules/node';
import { sort } from '@shared/components';

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
});

const nodeCount = atom<number>({
  key: 'node.nodeCount',
  default: 0,
});

const nodeListByHost = atom<Node[]>({
  key: 'node.nodeListByHost',
  default: [],
});

const nodeListByHostCount = atom<number>({
  key: 'node.nodeListByHostCount',
  default: 0,
});

const isLoadingNodeListByHost = atom<LoadingState>({
  key: 'node.nodeListByHost.loading',
  default: 'initializing',
});

const isLoading = atom<LoadingState>({
  key: 'node.loading',
  default: 'initializing',
});

const isLoadingActiveNode = atom<LoadingState>({
  key: 'node.loadingActiveNode',
  default: 'initializing',
});

const isFiltersOpen = atom<boolean>({
  key: 'node.isFiltersOpen',
  default: false,
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
      const blockchainsAll = get(blockchainAtoms.blockchains);

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
  default: sort(
    nodeStatusList
      .filter((item) => item.id !== 0 && !item.type)
      .map((item) => ({
        ...item,
        name: item.name?.toLowerCase(),
        id: item.id?.toString(),
        isChecked: false,
      })),
    {
      field: 'name',
      order: 'asc',
    },
  ),
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

    const total = [
      filtersBlockchainTotal,
      filtersTypeTotal,
      filtersStatusTotal,
      filtersHealthTotal,
    ].filter(Boolean).length;

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

export const nodeAtoms = {
  activeNode,
  nodeList,
  nodeCount,
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
  nodeListByHost,
  nodeListByHostCount,
  isLoadingNodeListByHost,
};
