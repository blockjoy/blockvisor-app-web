import { AppLayout } from "@modules/layout";

const Dashboard = () => {
  return (
    <div>
      <main>Nodes index page</main>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={["Nodes", "Status"]}>{page}</AppLayout>
}

export default Dashboard;

