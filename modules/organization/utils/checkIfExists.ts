export const checkIfExists = (membersAndInvitations: any, email: string) => {
  if (
    membersAndInvitations.some(
      (member: ClientOrganizationMember) =>
        member.email?.toLowerCase() === email,
    )
  )
    return 'member';
  if (
    membersAndInvitations.some(
      (invitation: ClientOrganizationInvitation) =>
        invitation.inviteeEmail?.toLowerCase() === email,
    )
  )
    return 'invited';

  return;
};
