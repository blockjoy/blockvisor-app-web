import { MemberAndInvitation } from '../types';

export const mapMembersAndInvitations = (
  membersAndInvitations: any,
): MemberAndInvitation[] => {
  return membersAndInvitations.map((mi: any) => ({
    id: mi.email ? mi.userId : null,
    email: mi.email ? mi.email : mi.inviteeEmail,
    name: mi.name ? mi.name : null,
    isPending: mi.inviteeEmail ? true : false,
    invitationId: mi.inviteeEmail ? mi.id : null,
  }));
};
