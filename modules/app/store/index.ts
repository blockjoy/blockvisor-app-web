import { atom } from 'recoil';
import { Dashboard } from '@modules/app/components/dashboard/Dashboard';
import { Host } from '@modules/app/components/host/Host';
import { Node } from '@modules/app/components/node/Node';

const defaultDashboard: Dashboard = {
  nodeMetrics: [],
  recentHosts: [],
};

const defaultHost: Host = {
  name: '',
  status: 0,
  ip: '',
  location: '',
  details: [],
  nodes: [],
};

const defaultNode: Node = {
  name: '',
  created: '',
  id: '',
  ip: '',
  status: 0,
  details: [],
};

export const appState = atom({
  key: 'appState',
  default: {
    dashboard: defaultDashboard,
    dashboardLoading: true,
    nodes: [],
    nodesLoading: true,
    nodesSorting: false,
    nodesSortExpression: 'added',
    nodesSortOrder: 'asc',
    hosts: [],
    hostsLoading: true,
    host: defaultHost,
    hostLoading: true,
    node: defaultNode,
    nodeLoading: true,
  },
});
