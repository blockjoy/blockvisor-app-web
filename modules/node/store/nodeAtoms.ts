import { atom } from 'recoil';

export const bla = '';

const activeNode = atom<BlockjoyNode | null>({
  key: 'node.activeNode',
  default: null,
});

const nodeRows = atom<Row[] | null>({
  key: 'node.nodeRows',
  default: null,
});

const isLoading = atom<LoadingState>({
  key: 'node.loading',
  default: 'initializing',
});

export const nodeAtoms = {
  activeNode,
  nodeRows,
  isLoading,
};
