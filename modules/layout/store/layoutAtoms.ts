import { atom } from 'recoil';

export type LayoutStates =
  | 'hosts'
  | 'nodes'
  | 'profile'
  | 'organisation'
  | 'editOrganisation'
  | 'sidebar';

export const layoutState = atom<LayoutStates | undefined>({
  key: 'layoutState',
  default: undefined,
});
