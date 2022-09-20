import { atom } from 'recoil';
import { Dashboard } from '@modules/app/components/dashboard/Dashboard';

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
