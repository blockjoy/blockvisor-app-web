import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { atom } from 'recoil';

export type FilterItem = {
  name?: string | undefined;
  id?: string | undefined;
  isChecked?: boolean | undefined;
};

export const activeNode = atom<Node | null>({
  key: 'node.activeNode',
  default: null,
});
