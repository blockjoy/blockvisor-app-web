import { atom } from 'recoil';
import { Dashboard } from '@modules/app/components/dashboard/Dashboard';
import { Node } from '@modules/app/components/node/Node';

const defaultDashboard: Dashboard = {
  nodeMetrics: [],
  recentHosts: [],
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
    node: defaultNode,
    nodeLoading: true,
  },
});
