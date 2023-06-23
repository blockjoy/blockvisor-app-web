import { AppLayout } from '@modules/layout';
import {
  OrganizationManagement,
  OrganizationView,
  OrganizationDetails,
} from '@modules/organization';
import { OrganizationsUIProvider } from '@modules/organization/ui/OrganizationsUIContext';

const Organizations = () => (
  <OrganizationsUIProvider>
    <OrganizationManagement>
      <OrganizationView>
        <OrganizationDetails />
      </OrganizationView>
    </OrganizationManagement>
  </OrganizationsUIProvider>
);

Organizations.getLayout = function getLayout(page: any) {
  return <AppLayout isPageFlex>{page}</AppLayout>;
};

export default Organizations;
