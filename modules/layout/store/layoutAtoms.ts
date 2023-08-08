import { atom } from 'recoil';
import { localStorageEffect } from 'utils/store/persist';

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
  effects: [localStorageEffect('sidebarOpen')],
});
