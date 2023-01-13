import { atom } from 'recoil';

export type LayoutStates =
  | 'hosts'
  | 'nodes'
  | 'profile'
  | 'organization'
  | 'editOrganization'
  | 'sidebar';

export const layoutState = atom<LayoutStates | undefined>({
  key: 'layoutState',
  default: undefined,
});

export const sidebarOpen = atom<boolean>({
  key: 'sidebarOpen',
  default: false,
});
