import { ApplicationError } from '@modules/auth/utils/Errors';
import { invitationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useDefaultOrganization } from './useDefaultOrganization';

export const useInviteMembers = () => {
  const { defaultOrganization } = useDefaultOrganization();

  const inviteMembers = async (
    inviteeEmail: string,
    onComplete: VoidFunction,
  ) => {
    const formattedEmail = inviteeEmail?.toLowerCase();
    try {
      await invitationClient.inviteOrgMember(
        formattedEmail,
        defaultOrganization?.id!,
      );
      toast.success('Invitation Sent');
      onComplete();
    } catch (err) {
      console.log('inviteOrgMemberError', err);
      toast.error('Error Inviting');
    }
  };

  return {
    inviteMembers,
  };
};
