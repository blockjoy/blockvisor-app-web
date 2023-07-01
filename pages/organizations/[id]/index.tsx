import { AppLayout } from '@modules/layout';
import {
  OrganizationMembersView,
  OrganizationManagement,
  OrganizationView,
} from '@modules/organization';
import { OrganizationsUIProvider } from '@modules/organization/ui/OrganizationsUIContext';
import { isMobile } from 'react-device-detect';

const OrganizationPage = () => (
  <OrganizationsUIProvider>
    <OrganizationManagement hideList={isMobile}>
      <OrganizationView>
        <OrganizationMembersView />
      </OrganizationView>
    </OrganizationManagement>
  </OrganizationsUIProvider>
);

OrganizationPage.getLayout = function getLayout(page: any) {
  return (
    <AppLayout isPageFlex pageTitle="Organization">
      {page}
    </AppLayout>
  );
};

export default OrganizationPage;
