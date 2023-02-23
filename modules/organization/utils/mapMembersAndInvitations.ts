export type MemberAndInvitation = {
  id?: string | null;
  email?: string;
  createdAt?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  invitationId?: string | null;
  isPending?: boolean;
};

export const mapMembersAndInvitations = (
  membersAndInvitations: any,
): MemberAndInvitation[] => {
  return membersAndInvitations.map((mi: any) => ({
    id: mi.email ? mi.id : null,
    email: mi.email ? mi.email : mi.inviteeEmail,
    createdAt: null,
    firstName: mi.firstName ? mi.firstName : null,
    lastName: mi.lastName ? mi.lastName : null,
    isPending: mi.inviteeEmail ? true : false,
    invitationId: mi.inviteeEmail ? mi.id : null,
  }));
};
