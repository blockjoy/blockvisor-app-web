import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { Dashboard } from '../components/dashboard/Dashboard';

interface Hook {
  loadDashboard: () => void;
}

export const useDashboard = (): Hook => {
  const [app, setApp] = useRecoilState(appState);
  const { grpcClient } = app;

  const loadDashboard = async () => {
    setApp({
      ...app,
      dashboardLoading: true,
    });

    const nodes: any = await grpcClient.getDashboardMetrics();

    const online = +nodes[0]?.value?.value,
      offline = +nodes[1]?.value?.value,
      total = +nodes[0]?.value?.value + +nodes[1]?.value?.value;

    const dashboard: Dashboard = {
      nodeMetrics: [
        { name: 'Total', value: total },
        { name: 'Online', value: online, isPrimary: true },
        { name: 'Offline', value: offline, isGreyedOut: true },
      ],
    };

    setApp({
      ...app,
      dashboard,
      dashboardLoading: false,
    });
  };
  return {
    loadDashboard,
  };
};
