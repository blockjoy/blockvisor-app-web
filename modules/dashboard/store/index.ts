import { atom } from 'recoil';
import { Dashboard } from '../components/Dashboard/Dashboard';

const defaultDashboard: Dashboard = {
  nodeMetrics: [],
  recentHosts: [],
};

export const appState = atom<{
  dashboard: Dashboard;
  dashboardLoading: LoadingState;
}>({
  key: 'appState',
  default: {
    dashboard: defaultDashboard,
    dashboardLoading: 'initializing',
  },
});
