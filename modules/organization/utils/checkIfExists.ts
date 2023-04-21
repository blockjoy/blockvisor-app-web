import { Invitation } from '@modules/grpc/library/invitation';
import { OrgUser } from '@modules/grpc/library/organization';

export const checkIfExists = (
  members: OrgUser[],
  invitations: Invitation[],
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
