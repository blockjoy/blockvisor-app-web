export const checkIfExists = (
  members: ClientOrganizationMember[],
  invitations: ClientOrganizationInvitation[],
  email: string
) => {
  if (members.some(member => member.email === email)) return 'member';
  if (invitations.some(invitation => invitation.inviteeEmail === email)) return 'invited';

  return;
};
