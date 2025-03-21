import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';

export const getOrganizationRole = (roles: OrgRole[]) => {
  return roles?.some((r) => r.name === 'org-owner') ||
    roles?.some((r) => r.name === 'org-personal')
    ? 'Owner'
    : roles?.some((r) => r.name === 'org-admin')
    ? 'Admin'
    : roles?.some((r) => r.name === 'org-member')
    ? 'Member'
    : 'None';
};
