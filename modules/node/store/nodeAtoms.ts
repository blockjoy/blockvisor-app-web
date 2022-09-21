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

const isLoading = atom<boolean>({
  key: 'node.loading',
  default: true,
});

export const nodeAtoms = {
  activeNode,
  nodeRows,
  isLoading,
};
