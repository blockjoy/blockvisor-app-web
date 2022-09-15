import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { Dashboard } from '../components/dashboard/Dashboard';
import { TableBlockHosts } from '../components/shared';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { HostStatus } from '../components/shared/host-status/HostStatus';
import { apiClient } from '@modules/client';

interface Hook {
  loadDashboard: () => void;
}

export const useDashboard = (): Hook => {
  const [app, setApp] = useRecoilState(appState);

  const getRecentHosts = async () => {
    const hostsResponse: any = await apiClient.getHosts();

    const hosts = hostsResponse.map((host: any) => ({
      key: host.id.value,
      cells: [
        {
          key: '1',
          component: (
            <>
              <TableBlockHosts
                location={host.location}
                name={host.name}
                address={host.address}
              />
            </>
          ),
        },
        {
          key: '2',
          component: (
            <span>
              {formatDistanceToNow(new Date(host.created_at_datetime), {
                addSuffix: true,
              })}
            </span>
          ),
        },
        {
          key: '3',
          component: <HostStatus status={host.status} />,
        },
      ],
    }));

    return hosts;
  };

  const loadDashboard = async () => {
    setApp({
      ...app,
      dashboardLoading: true,
    });

    const nodes: any = await apiClient.getDashboardMetrics();

    const online = +nodes[0]?.value?.value,
      offline = +nodes[1]?.value?.value,
      total = +nodes[0]?.value?.value + +nodes[1]?.value?.value;

    const recentHosts = await getRecentHosts();

    const dashboard: Dashboard = {
      nodeMetrics: [
        { name: 'Total', value: total },
        { name: 'Online', value: online, isPrimary: true },
        { name: 'Offline', value: offline, isGreyedOut: true },
      ],
      recentHosts,
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
