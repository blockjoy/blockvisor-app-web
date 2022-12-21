import { AppLayout } from '@modules/layout';
import { OrganizationsPage } from '@modules/organizations';

const Organizations = () => <OrganizationsPage />;

Organizations.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>;
};

export default Organizations;
