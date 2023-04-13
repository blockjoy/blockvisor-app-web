export type MemberAndInvitation = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  invitationId?: string;
  isPending?: boolean;
};

export const mapMembersAndInvitations = (
  membersAndInvitations: any,
): MemberAndInvitation[] => {
  return membersAndInvitations.map((mi: any) => ({
    id: mi.email ? mi.id : null,
    email: mi.email ? mi.email : mi.inviteeEmail,
    firstName: mi.firstName ? mi.firstName : null,
    lastName: mi.lastName ? mi.lastName : null,
    isPending: mi.inviteeEmail ? true : false,
    invitationId: mi.inviteeEmail ? mi.id : null,
  }));
};
