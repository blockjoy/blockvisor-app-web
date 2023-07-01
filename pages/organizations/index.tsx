import { AppLayout } from '@modules/layout';
import {
  OrganizationManagement,
  OrganizationView,
  OrganizationMembersView,
} from '@modules/organization';
import { OrganizationsUIProvider } from '@modules/organization/ui/OrganizationsUIContext';
import { isMobile } from 'react-device-detect';

const Organizations = () => (
  <OrganizationsUIProvider>
    <OrganizationManagement isListOnly={isMobile}>
      <OrganizationView>
        <OrganizationMembersView />
      </OrganizationView>
    </OrganizationManagement>
  </OrganizationsUIProvider>
);

Organizations.getLayout = function getLayout(page: any) {
  return <AppLayout isPageFlex>{page}</AppLayout>;
};

export default Organizations;
