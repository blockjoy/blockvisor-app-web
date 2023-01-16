import { AppLayout } from '@modules/layout';
import { OrganizationView } from '@modules/organization';

const OrganizationPage = () => <OrganizationView />;

OrganizationPage.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Organization">{page}</AppLayout>;
};

export default OrganizationPage;
