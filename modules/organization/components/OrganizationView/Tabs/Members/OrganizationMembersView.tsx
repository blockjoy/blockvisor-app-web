import { OrganizationMembersUIProvider } from '@modules/organization/ui/OrganizationMembersUIContext';
import { OrganizationMembers } from './OrganizationMembers';

export const OrganizationMembersView = () => {
  return (
    <OrganizationMembersUIProvider>
      <OrganizationMembers />
    </OrganizationMembersUIProvider>
  );
};
