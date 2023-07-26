import { invitationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useDefaultOrganization } from './useDefaultOrganization';
import { useInvitations } from './useInvitations';

export const useResendInvitation = () => {
  const { defaultOrganization } = useDefaultOrganization();
  const { modifySentInvitations } = useInvitations();

  const resendInvitation = async (email: string, invitationId: string) => {
    try {
      await invitationClient.revokeInvitation(invitationId);
      const newInvitation = await invitationClient.inviteOrgMember(
        email,
        defaultOrganization?.id!,
      );
      modifySentInvitations(newInvitation);
      toast.success('Invitation Resent');
    } catch (error) {
      toast.error('Error Resending');
    }
  };

  return {
    resendInvitation,
  };
};
