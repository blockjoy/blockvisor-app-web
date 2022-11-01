import { GridCell } from '@shared/components/TableGrid/types/GridCell';
import { atom } from 'recoil';

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

export const nodeAtoms = {
  activeNode,
  nodeRows,
  nodeCells,
  isLoading,
  activeListType,
};
