import { AppLayout } from '@modules/layout';
import {
  OrganizationDetails,
  OrganizationManagement,
  OrganizationView,
} from '@modules/organization';
import { OrganizationsUIProvider } from '@modules/organization/ui/OrganizationsUIContext';

const OrganizationPage = () => (
  <OrganizationsUIProvider>
    <OrganizationManagement>
      <OrganizationView>
        <OrganizationDetails />
      </OrganizationView>
    </OrganizationManagement>
  </OrganizationsUIProvider>
);

OrganizationPage.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Organization">{page}</AppLayout>;
};

export default OrganizationPage;
