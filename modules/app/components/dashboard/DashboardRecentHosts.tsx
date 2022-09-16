import { appState } from '@modules/app/store';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { Button } from '@shared/components';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { PageHeader, Table } from '../shared';

export const DashboardRecentHosts = () => {
  const router = useRouter();
  const { dashboard, dashboardLoading } = useRecoilValue(appState);
  const { recentHosts } = dashboard;
  const setLayoutState = useSetRecoilState(layoutState);

  const handleHostClicked = (args: any) => router.push(`hosts/${args.key}`);

  return (
    <>
      <PageHeader>
        Recent Hosts
        <Button
          disabled={dashboardLoading}
          size="small"
          style="secondary"
          onClick={() => setLayoutState('hosts')}
        >
          Add Host
        </Button>
      </PageHeader>
      <Table
        headers={[
          {
            name: 'Name',
            key: '1',
            width: '35%',
          },
          {
            name: 'Added',
            key: '2',
            width: '35%',
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
