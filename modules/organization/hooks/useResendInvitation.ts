import { invitationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useDefaultOrganization } from './useDefaultOrganization';

export const useResendInvitation = () => {
  const { defaultOrganization } = useDefaultOrganization();

  const resendInvitation = async (email: string, invitationId: string) => {
    try {
      await invitationClient.revokeInvitation(invitationId);
      await invitationClient.inviteOrgMember(email, defaultOrganization?.id!);
      toast.success('Invitation Resent');
    } catch (error) {
      toast.error('Error Resending');
    }
  };

  return {
    resendInvitation,
  };
};
