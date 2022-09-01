import { AppLayout } from "@modules/layout";

const Dashboard = () => {
  return (
    <div>
      <main>Hosts index page</main>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={["Hosts", "Status"]}>{page}</AppLayout>
}

export default Dashboard;

