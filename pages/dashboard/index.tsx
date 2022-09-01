import { AppLayout } from "@modules/layout";

const Dashboard = () => {
  return (
    <div>
      <main>Dashboard index page</main>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={["Dashboard", "Home"]}>{page}</AppLayout>
}
