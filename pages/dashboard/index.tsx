import { AppLayout } from '@modules/layout';
import { Dashboard as DashboardPage } from '@modules/dashboard';

const Dashboard = () => <DashboardPage />;

Dashboard.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Dashboard', 'Home']}>{page}</AppLayout>;
};

export default Dashboard;
