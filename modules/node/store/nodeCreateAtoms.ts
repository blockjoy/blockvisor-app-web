import { atom } from 'recoil';

export type FilterItem = {
  name?: string | undefined;
  id?: string | undefined;
  isChecked?: boolean | undefined;
};

export const activeNode = atom<BlockjoyNode | null>({
  key: 'node.activeNode',
  default: null,
});
