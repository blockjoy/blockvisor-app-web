import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { invitationClient } from '@modules/grpc';
import { useInvitations } from './useInvitations';
import { organizationSelectors } from '@modules/organization';

export const useResendInvitation = () => {
  const { modifySentInvitations } = useInvitations();

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

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
