export function getOrganizationDetails(org: ClientOrganization | null) {
  if (!org) {
    return null;
  }

  const details = [
    { label: 'TYPE', data: org.personal ? 'Personal' : 'Other' },
    { label: 'MEMBERS', data: org?.memberCount?.toString() ?? '0' },
  ];

  return details;
}
