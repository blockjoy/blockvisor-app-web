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
};

const activeNode = atom<BlockjoyNode | null>({
  key: 'node.activeNode',
  default: null,
});

const activeListType = atom<string | 'table' | 'grid'>({
  key: 'node.activeListType',
  default: 'table',
});

const nodeRows = atom<Row[] | null>({
  key: 'node.nodeRows',
  default: null,
});

const nodeCells = atom<GridCell[] | null>({
  key: 'node.nodeCells',
  default: null,
});

const isLoading = atom<LoadingState>({
  key: 'node.loading',
  default: 'initializing',
});

const filtersBlockchain = atom<FilterItem[]>({
  key: 'node.filtersBlockchain',
  default: blockchainList.map((item) => ({
    name: item.label,
    id: item.value,
    isChecked: false,
  })),
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
  default: nodeStatusList.map((item) => ({
    name: item.name,
    id: item.id.toString()!,
    isChecked: false,
  })),
});

const filterOnlineOffline = atom<string | 'online' | 'offline' | null>({
  key: 'node.filtersOnlineOffline',
  default: null,
});

export const nodeAtoms = {
  activeNode,
  nodeRows,
  nodeCells,
  isLoading,
  activeListType,
  filterOnlineOffline,
  filtersBlockchain,
  filtersStatus,
  filtersType,
};
