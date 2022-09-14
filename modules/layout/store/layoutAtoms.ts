import { atom } from 'recoil';

export const layoutState = atom<'hosts' | 'nodes' | 'profile' | undefined>({
  key: 'layoutState',
  default: undefined,
});
