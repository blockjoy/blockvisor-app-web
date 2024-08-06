import { selector, selectorFamily } from 'recoil';
import isEqual from 'lodash/isEqual';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { NodeSort } from '@modules/grpc/library/blockjoy/v1/node';
import { UINodeFilterCriteria } from '@modules/grpc';
import { nodeStatusList } from '@shared/constants/nodeStatusList';
import {
  nodeTypeList,
  NODE_FILTERS_DEFAULT,
  NODE_SORT_DEFAULT,
} from '@shared/constants/lookups';
import { NodeStatusListItem, sort } from '@shared/components';
import {
  nodeAtoms,
  blockchainAtoms,
  blockchainSelectors,
  BlockchainSimple,
  NetworkConfigSimple,
  InitialNodeQueryParams,
} from '@modules/node';
import { authAtoms } from '@modules/auth';

const settings = selector<NodeSettings>({
  key: 'node.settings',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings?.hasOwnProperty('nodes')) return {};

    return JSON.parse(userSettings?.nodes ?? '{}');
  },
});

const filters = selector<UINodeFilterCriteria>({
  key: 'node.filters',
  get: ({ get }) => {
    const nodeSettings = get(settings);
    const searchQuery = get(nodeAtoms.filtersSearchQuery);

    return nodeSettings?.filters
      ? { ...nodeSettings.filters, keyword: searchQuery ?? '' }
      : NODE_FILTERS_DEFAULT;
  },
});

const isFiltersEmpty = selector({
  key: 'node.filters.isEmpty',
  get: ({ get }) => {
    const filtersVal = get(filters);

    return isEqual(filtersVal, NODE_FILTERS_DEFAULT);
  },
});

const nodeSort = selector<NodeSort[]>({
  key: 'node.sort',
  get: ({ get }) => {
    const nodeSettings = get(settings);

    return nodeSettings?.sort ?? NODE_SORT_DEFAULT;
  },
});

const queryParams = selector<InitialNodeQueryParams>({
  key: 'node.queryParams',

  get: ({ get }) => {
    const filter = get(filters);
    const sort = get(nodeSort);
    const pagination = get(nodeAtoms.nodeListPagination);
    const keyword = get(nodeAtoms.filtersSearchQuery);

    return {
      pagination,
      filter: {
        ...filter,
        keyword: keyword ?? filter.keyword,
      },
      sort,
    };
  },
});

const regionsByBlockchain = selectorFamily<Region[], BlockchainSimple>({
  key: 'node.regions.byBlockchain',
  get:
    ({ blockchainId, version, nodeType }) =>
    ({ get }) => {
      const regionsList = get(nodeAtoms.allRegions);

      return (
        regionsList.find(
          (region) =>
            region.blockchainId === blockchainId &&
            region.version === version &&
            region.nodeType === nodeType,
        )?.regions ?? []
      );
    },
});

const filtersBlockchainSelectedIds = selector<string[]>({
  key: 'node.filters.blockchain',
  get: ({ get }) => get(filters)?.blockchain ?? [],
});

const filtersBlockchainAll = selectorFamily<
  (Blockchain & FilterListItem)[],
  string[]
>({
  key: 'node.filters.blockchain.all',
  get:
    (tempFilters: string[]) =>
    ({ get }) => {
      const allBlockchains = get(blockchainAtoms.blockchains);
      if (!allBlockchains.length) return [];

      const allFilters = allBlockchains.map((blockchain) => ({
        ...blockchain,
        name: blockchain.displayName,
        isChecked: tempFilters?.some((filter) => blockchain.id === filter),
      }));

      return allFilters;
    },
});

const filtersStatusAll = selectorFamily<FilterListItem[], string[]>({
  key: 'node.filters.nodeStatus.all',
  get: (tempFilters) => () => {
    const allStatuses: (NodeStatusListItem & FilterListItem)[] = sort(
      nodeStatusList
        .filter((item) => item.id !== 0 && !item.type)
        .map((item) => ({
          ...item,
          name: item.name?.toLowerCase(),
          id: item.id?.toString(),
        })),
      {
        field: 'name',
        order: SortOrder.SORT_ORDER_ASCENDING,
      },
    );

    if (!allStatuses.length) return [];

    const allFilters = allStatuses.map((status) => ({
      ...status,
      isChecked: tempFilters?.some((filter) => status.id === filter),
    }));

    return allFilters;
  },
});

const filtersTypeAll = selectorFamily<FilterListItem[], string[]>({
  key: 'node.filters.nodeType.all',
  get: (tempFilters: string[]) => () => {
    const allTypes = nodeTypeList.map((item) => ({
      name: item.name,
      id: item.id.toString()!,
    }));

    if (!allTypes.length) return [];

    const allFilters = allTypes.map((type) => ({
      ...type,
      isChecked: tempFilters?.some((filter) => type.id === filter),
    }));

    return allFilters;
  },
});

const filtersNetworksAll = selectorFamily<
  (NetworkConfigSimple & FilterListItem)[],
  string[]
>({
  key: 'node.filters.networks.all',
  get:
    (tempFilters: string[]) =>
    ({ get }) => {
      const filterBlockchainsIDs = get(filtersBlockchainSelectedIds);

      const allNetworks = get(
        blockchainSelectors.blockchainNetworks(filterBlockchainsIDs),
      );

      const allFilters = allNetworks.map((network) => ({
        ...network,
        isChecked: tempFilters?.some((filter) => network.id === filter),
      }));

      return allFilters;
    },
});

export const nodeSelectors = {
  settings,
  filters,
  isFiltersEmpty,
  nodeSort,
  queryParams,

  regionsByBlockchain,

  filtersBlockchainSelectedIds,

  filtersBlockchainAll,
  filtersStatusAll,
  filtersTypeAll,
  filtersNetworksAll,
};
