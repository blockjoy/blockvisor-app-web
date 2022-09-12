import { useRouter } from 'next/router';
import { PageHeader, Table } from '../shared';
import { Button } from '@shared/components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store';
import { appState } from '@modules/app/store';

export const DashboardRecentHosts = () => {
  const router = useRouter();
  const [layout, setLayout] = useRecoilState(layoutState);
  const { dashboard, dashboardLoading } = useRecoilValue(appState);
  const { recentHosts } = dashboard;

  const handleAddHost = () => setLayout({ ...layout, isHostsAddOpen: true });

  const handleHostClicked = (args: any) => router.push(`hosts/${args.key}`);

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
      <Table
        headers={[
          {
            name: 'Name',
            key: '1',
          },
          {
            name: 'Added',
            key: '2',
            isHiddenOnMobile: true,
          },
          {
            name: 'Status',
            width: '100px',
            key: '3',
          },
        ]}
        rows={recentHosts}
        isLoading={dashboardLoading}
        onRowClick={handleHostClicked}
      />
    </>
  );
};
