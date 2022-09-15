import { AppLayout } from "@modules/layout";
import DashboardModule from "@modules/app/components/dashboard/Dashboard";

const Dashboard = () => <DashboardModule />;

Dashboard.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={["Dashboard", "Home"]}>{page}</AppLayout>
}

export default Dashboard;


