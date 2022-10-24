import { appState } from '@modules/dashboard/store';
import { useHosts } from '@modules/hosts';
import { Button, PageHeader, Table } from '@shared/components';

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

export const RecentHosts = () => {
  const router = useRouter();
  const { dashboard, dashboardLoading } = useRecoilValue(appState);
  const { recentHosts } = dashboard;
  const { createHostProvision } = useHosts();
  const loading =
    dashboardLoading === 'loading' || dashboardLoading === 'initializing';

  const handleHostClicked = (args: any) => router.push(`hosts/${args.key}`);

  const handleCreateClicked = async () => {
    createHostProvision((key: string) => {
      router.push(`hosts/install/${key}`);
    });
  };

  return (
    <>
      <PageHeader>
        Recent Hosts
        <Button
          disabled={loading}
          size="small"
          style="secondary"
          onClick={handleCreateClicked}
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
        isLoading={loading}
        onRowClick={handleHostClicked}
      />
    </>
  );
};
