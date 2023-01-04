import { AppLayout } from '@modules/layout';
import { OrganizationManagement } from '@modules/organization';
import { OrganizationsUIProvider } from '@modules/organization/ui/OrganizationsUIContext';

const Organizations = () => (
  <OrganizationsUIProvider>
    <OrganizationManagement />
  </OrganizationsUIProvider>
);

Organizations.getLayout = function getLayout(page: any) {
  return <AppLayout isPageFlex>{page}</AppLayout>;
};

export default Organizations;
