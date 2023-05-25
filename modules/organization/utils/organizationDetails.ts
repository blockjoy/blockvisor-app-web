import { Org } from '@modules/grpc/library/blockjoy/v1/org';

export function getOrganizationDetails(org: Org | null) {
  if (!org) {
    return null;
  }

  const details = [
    { label: 'TYPE', data: org.personal ? 'Personal' : 'Other' },
    { label: 'MEMBERS', data: org?.memberCount },
    { label: 'NODES', data: org?.nodeCount },
  ];

  return details;
}
