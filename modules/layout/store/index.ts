import { atom } from 'recoil';

export const layoutState = atom({
  key: 'layoutState',
  default: {
    isSidebarOpen: false,
    isProfileOpen: false,
    isNodeAddOpen: false,
    isHostsAddOpen: false,
  },
});
