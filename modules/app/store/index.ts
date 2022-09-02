import { atom } from 'recoil';

export const appState = atom({
  key: 'appState',
  default: {
    nodesLoading: true,
    nodesSortExpression: "added",
    nodesSortOrder: "asc",
    hostsLoading: true,
    hostsSortExpression: "added",
    hostsSortOrder: "asc",
  },
});
