import { atom } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { UINodeFilterCriteria } from '@modules/grpc/clients/nodeClient';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { BlockchainSimpleWRegion } from '@modules/node';
import { localStorageEffect } from 'utils/store/persist';
import { NODE_FILTERS_DEFAULT } from '@shared/constants/lookups';

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

const isFiltersOpen = atom<boolean>({
  key: 'node.filters.isOpen',
  default: false,
  effects: [localStorageEffect('node.filters.isOpen')],
});

const filters = atom<UINodeFilterCriteria>({
  key: 'node.filters',
  default: NODE_FILTERS_DEFAULT,
  effects: [localStorageEffect('node.filters')],
});

const filtersTempTotal = atom<number>({
  key: 'node.filters.temp.total',
  default: 0,
});

export const nodeAtoms = {
  activeNode,
  nodeList,
  nodeCount,
  isLoading,
  isLoadingActiveNode,
  selectedSKU,
  activeListType,

  isFiltersOpen,
  filters,
  filtersTempTotal,

  regions,
  regionsLoadingState,
  allRegions,
  allRegionsLoadingState,

  nodeListByHost,
  nodeListByHostCount,
  isLoadingNodeListByHost,
};
