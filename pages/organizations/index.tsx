import { AppLayout } from '@modules/layout';
import { OrganizationsPage } from '@modules/organizations';
import { OrganizationsUIProvider } from '@modules/organizations/ui/OrganizationsUIContext';

const Organizations = () => (
  <OrganizationsUIProvider>
    <OrganizationsPage />
  </OrganizationsUIProvider>
);

Organizations.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>;
};

export default Organizations;
