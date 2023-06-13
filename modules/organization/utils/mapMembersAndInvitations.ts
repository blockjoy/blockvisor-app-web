import { sort } from '@shared/components/Tables/Table/utils/sort';

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
  const mapped = membersAndInvitations.map((mi: any) => ({
    id: mi.email ? mi.userId : null,
    email: mi.email ? mi.email : mi.inviteeEmail,
    name: mi.name ? mi.name : null,
    isPending: mi.inviteeEmail ? true : false,
    invitationId: mi.inviteeEmail ? mi.id : null,
  }));
  return sort(mapped, { field: 'email', order: 'asc' });
};
