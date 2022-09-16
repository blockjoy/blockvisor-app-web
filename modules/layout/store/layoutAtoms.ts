import { atom } from 'recoil';

export type LayoutStates = 'hosts' | 'nodes' | 'profile' | 'organisation';

export const layoutState = atom<LayoutStates | undefined>({
  key: 'layoutState',
  default: undefined,
});
