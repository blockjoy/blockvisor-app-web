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

export const activeNode = atom<BlockjoyNode | null>({
  key: 'node.activeNode',
  default: null,
});
