import { GridCell } from '@shared/components/TableGrid/types/GridCell';
import { atom } from 'recoil';
import {
  blockchainList,
  nodeStatusList,
  nodeTypeList,
} from '@shared/constants/lookups';

export type FilterItem = {
  name?: string | undefined;
  id?: string | undefined;
  isChecked?: boolean | undefined;
  isOnline?: boolean | undefined;
};

const activeNode = atom<BlockjoyNode | null>({
  key: 'node.activeNode',
  default: null,
});

const activeListType = atom<string | 'table' | 'grid'>({
  key: 'node.activeListType',
  default: 'grid',
});

const nodeList = atom<BlockjoyNode[]>({
  key: 'node.nodeList',
  default: [],
});

const isLoading = atom<LoadingState>({
  key: 'node.loading',
  default: 'initializing',
});

const isFiltersOpen = atom<boolean>({
  key: 'node.isFiltersOpen',
  default: false,
});

const isFiltersCollapsed = atom<boolean>({
  key: 'node.isFiltersCollapsed',
  default: true,
});

const filtersBlockchain = atom<FilterItem[]>({
  key: 'node.filtersBlockchain',
  default: [],
});

const filtersType = atom<FilterItem[]>({
  key: 'node.filtersType',
  default: nodeTypeList.map((item) => ({
    name: item.name,
    id: item.id.toString()!,
    isChecked: false,
  })),
});

const filtersStatus = atom<FilterItem[]>({
  key: 'node.filtersStatus',
  default: nodeStatusList
    .filter((item) => item.id !== 0)
    .map((item) => ({
      name: item.name,
      // id: item.id.toString()!,
      id: item.name.toString().toLowerCase()!,
      isChecked: false,
      isOnline: item.isOnline,
    })),
});

const filtersHealth = atom<string | 'online' | 'offline' | null>({
  key: 'node.filtersHealth',
  default: null,
});

const nodeWizardActive = atom<boolean>({
  key: 'nodeWizard.active',
  default: false,
});

const hasMoreNodes= atom<any>({
  key:'node.hasMore',
  default: false
});

export const nodeAtoms = {
  activeNode,
  nodeList,
  isLoading,
  isFiltersOpen,
  isFiltersCollapsed,
  activeListType,
  filtersHealth,
  filtersBlockchain,
  filtersStatus,
  filtersType,
  nodeWizardActive,
  hasMoreNodes
};
