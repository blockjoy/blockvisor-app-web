import { AppLayout } from '@modules/layout';
import { AdminLayout } from '@modules/admin';

const Admin = () => <AdminLayout />;

Admin.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Nodes">{page}</AppLayout>;
};

export default Admin;
