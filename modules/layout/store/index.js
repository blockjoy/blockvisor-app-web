import { atom } from 'recoil';

export const appState = atom({
  key: 'appState',
  default: {
    isSidebarOpen: false,
    isProfileOpen: false,
  },
});
