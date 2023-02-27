export const checkIfExists = (
  members: ClientOrganizationMember[],
  invitations: ClientOrganizationInvitation[],
  email: string,
) => {
  if (members.some((member) => member.email?.toLowerCase() === email))
    return 'member';
  if (
    invitations.some(
      (invitation) => invitation.inviteeEmail?.toLowerCase() === email,
    )
  )
    return 'invited';

  return;
};
