import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export const useResendInvitation = () => {
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const resendInvitation = async (email: string, invitationId: string) => {
    try {
      await apiClient.revokeInvitation({ invitationId, email });
      await apiClient.inviteOrgMember(email, selectedOrganization?.id!);
      toast.success('Invitation Resent');
    } catch (error) {
      toast.error('Error Resending');
    }
  };

  return {
    resendInvitation,
  };
};
