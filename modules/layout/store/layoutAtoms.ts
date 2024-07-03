import { atom } from 'recoil';

const isSidebarOpenMobile = atom<boolean>({
  key: 'layout.mobile.sidebar.isOpen',
  default: false,
});

const isNodeFiltersOpenMobile = atom<boolean>({
  key: 'layout.mobile.nodes.filters.isOpen',
  default: false,
});

const isHostFiltersOpenMobile = atom<boolean>({
  key: 'layout.mobile.hosts.filters.isOpen',
  default: false,
});

export const layoutAtoms = {
  isSidebarOpenMobile,
  isNodeFiltersOpenMobile,
  isHostFiltersOpenMobile,
};
