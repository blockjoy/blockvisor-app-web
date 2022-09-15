import { atom } from 'recoil';

type HostListItem = {
  label: string;
  value: string;
};

const defaultHostList: HostListItem[] = [];

export const layoutState = atom({
  key: 'layoutState',
  default: {
    isSidebarOpen: false,
    isProfileOpen: false,
    isNodeAddOpen: false,
    isHostsAddOpen: false,
    hostAddCreating: false,
    hostAddKey: undefined,
    nodeAddHostsList: defaultHostList,
    nodeAddHostsListLoading: true,
    nodeAddCreating: false,
  },
});
