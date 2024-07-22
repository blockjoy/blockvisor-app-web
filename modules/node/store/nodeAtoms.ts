import { atom } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { BlockchainSimpleWRegion } from '@modules/node';
import { localStorageEffect } from 'utils/store/persist';
import { NODE_PAGINATION_DEFAULT } from '@shared/index';

const activeNode = atom<Node | null>({
  key: 'node.activeNode',
  default: null,
});

const nodeList = atom<Node[]>({
  key: 'node.nodeList',
  default: [],
});

const nodeListPagination = atom<Pagination>({
  key: 'node.list.pagination',
  default: NODE_PAGINATION_DEFAULT,
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

const nodeListLoadingState = atom<LoadingState>({
  key: 'node.list.loadingState',
  default: 'initializing',
});

const isLoadingActiveNode = atom<LoadingState>({
  key: 'node.loadingActiveNode',
  default: 'initializing',
});

const regions = atom<Region[]>({
  key: 'node.regions',
  default: [],
});

const regionsLoadingState = atom<LoadingState>({
  key: 'node.regions.loadingState',
  default: 'initializing',
});

const allRegions = atom<BlockchainSimpleWRegion[]>({
  key: 'node.regions.all',
  default: [],
});

const allRegionsLoadingState = atom<LoadingState>({
  key: 'node.regions.all.loadingState',
  default: 'initializing',
});

const selectedSKU = atom<string>({
  key: 'node.sku',
  default: '',
});

const filtersTempTotal = atom<number>({
  key: 'node.filters.temp.total',
  default: 0,
});

const filtersSearchQuery = atom<string>({
  key: 'node.filters.searchQuery',
  default: '',
  effects: [localStorageEffect('node.filters.searchQuery')],
});

export const nodeAtoms = {
  activeNode,
  nodeList,
  nodeListPagination,
  nodeCount,
  nodeListLoadingState,
  isLoadingActiveNode,
  selectedSKU,

  filtersTempTotal,
  filtersSearchQuery,

  regions,
  regionsLoadingState,
  allRegions,
  allRegionsLoadingState,

  nodeListByHost,
  nodeListByHostCount,
  isLoadingNodeListByHost,
};
