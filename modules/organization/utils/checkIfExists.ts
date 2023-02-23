import { MemberAndInvitation } from './mapMembersAndInvitations';

export const checkIfExists = (
  membersAndInvitations: MemberAndInvitation[],
  email: string,
) => {
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
