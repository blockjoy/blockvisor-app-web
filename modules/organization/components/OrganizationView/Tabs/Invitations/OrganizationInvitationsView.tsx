import { OrganizationInvitationsUIProvider } from '@modules/organization/ui/OrganizationInvitationsUIContext';
import { OrganizationInvitations } from './OrganizationInvitations';

export const OrganizationInvitationsView = () => {
  return (
    <OrganizationInvitationsUIProvider>
      <OrganizationInvitations />
    </OrganizationInvitationsUIProvider>
  );
};
