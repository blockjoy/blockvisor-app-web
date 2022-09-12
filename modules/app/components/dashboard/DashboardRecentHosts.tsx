import { PageHeader, Table } from '../shared';
import { Button } from '@shared/components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store';
import { appState } from '@modules/app/store';

export const DashboardRecentHosts = () => {
  const [layout, setLayout] = useRecoilState(layoutState);
  const { dashboard, dashboardLoading } = useRecoilValue(appState);
  const { recentHosts } = dashboard;

  const handleAddHost = () => setLayout({ ...layout, isHostsAddOpen: true });

  console.log('recentHosts', recentHosts);

  return (
    <>
      <PageHeader>
        Recent Hosts
        <Button
          disabled={dashboardLoading}
          size="small"
          style="secondary"
          onClick={handleAddHost}
        >
          Add Host
        </Button>
      </PageHeader>
      <Table rows={recentHosts} isLoading={dashboardLoading} />
    </>
  );
};
