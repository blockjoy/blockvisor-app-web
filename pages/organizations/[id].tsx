import { AppLayout } from '@modules/layout';
import { OrganizationView } from '@modules/organization';

const OrganizationPage = () => <OrganizationView />;

OrganizationPage.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>;
};

export default OrganizationPage;
