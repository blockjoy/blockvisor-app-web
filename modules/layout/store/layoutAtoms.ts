import { atom } from 'recoil';

const isSidebarOpenMobile = atom<boolean>({
  key: 'layout.sidebar.mobile.isOpen',
  default: false,
});

export const layoutAtoms = {
  isSidebarOpenMobile,
};
