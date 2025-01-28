import { atom } from 'recoil';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { RegionInfo } from '@modules/grpc/library/blockjoy/v1/host';
import { UINodeFilterCriteria } from '@modules/grpc';
import { localStorageEffect } from 'utils/store/persist';
import { NODE_PAGINATION_DEFAULT } from '@shared/index';
import { Image } from '@modules/grpc/library/blockjoy/v1/image';
import { NodeConfig } from '../types/common';

const nodeLoadingState = atom<LoadingState>({
  key: 'node.loadingState',
  default: 'finished',
});

const activeNode = atom<Node | null>({
  key: 'node.activeNode',
  default: null,
});

const nodeImage = atom<Image | null>({
  key: 'node.nodeImage',
  default: null,
});

const nodeConfig = atom<NodeConfig | null>({
  key: 'node.nodeConfig',
  default: null,
});

const nodeListGlobal = atom<Node[]>({
  key: 'node.global.all',
  default: [],
});

const nodeListGlobalLoadingState = atom<LoadingState>({
  key: 'node.global.all.loadingState',
  default: 'finished',
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

const regions = atom<RegionInfo[]>({
  key: 'node.regions',
  default: [],
});

const regionsLoadingState = atom<LoadingState>({
  key: 'node.regions.loadingState',
  default: 'initializing',
});

const selectedSKU = atom<string>({
  key: 'node.sku',
  default: '',
});

const tempFilters = atom<UINodeFilterCriteria>({
  key: 'node.filters.temp',
  default: {},
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
  nodeLoadingState,

  activeNode,
  nodeImage,

  nodeListGlobal,
  nodeListGlobalLoadingState,

  nodeList,
  nodeListPagination,
  nodeCount,
  nodeListLoadingState,
  isLoadingActiveNode,
  selectedSKU,
  nodeConfig,

  tempFilters,
  filtersTempTotal,
  filtersSearchQuery,

  regions,
  regionsLoadingState,

  nodeListByHost,
  nodeListByHostCount,
  isLoadingNodeListByHost,
};
