import { AppLayout } from "@modules/layout";

const Dashboard = () => {
  return (
    <div>
      <main>Nodes index page</main>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>
}
