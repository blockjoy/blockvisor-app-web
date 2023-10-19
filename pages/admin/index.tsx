import { AppLayout } from '@modules/layout';
import { Admin } from '@modules/admin/Admin';

const Component = () => <Admin />;

Component.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Admin">{page}</AppLayout>;
};

export default Component;
