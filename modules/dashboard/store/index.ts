import { atom } from 'recoil';
import { Dashboard } from '../components/Dashboard/Dashboard';

const defaultDashboard: Dashboard = {
  nodeMetrics: [],
  recentHosts: [],
};

export const appState = atom({
  key: 'appState',
  default: {
    dashboard: defaultDashboard,
    dashboardLoading: true,
  },
});
