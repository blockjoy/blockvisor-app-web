import { atom } from 'recoil';

export const layoutState = atom<'hosts' | 'nodes' | undefined>({
  key: 'layoutState',
  default: undefined,
});
