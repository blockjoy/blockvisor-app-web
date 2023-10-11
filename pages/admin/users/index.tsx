import { AppLayout } from '@modules/layout';
import { AdminLayout, AdminUsers } from '@modules/admin';

const Admin = () => (
  <AdminLayout>
    <AdminUsers />
  </AdminLayout>
);

Admin.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Nodes">{page}</AppLayout>;
};

export default Admin;
