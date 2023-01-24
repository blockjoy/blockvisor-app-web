import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

const revokeInvitation = async ({
  email,
  invitationId,
}: {
  email: string;
  invitationId: string;
}) => {
  try {
    return apiClient.revokeInvitation({ invitationId, email });
  } catch (error) {
    throw new ApplicationError('Revoke Invitation', 'Revoke failed');
  }
};

const inviteMember = async ({
  invitee_email,
  orgId,
}: {
  invitee_email: string;
  orgId: string;
}) => {
  try {
    return apiClient.inviteOrgMember(invitee_email, orgId);
  } catch (error) {
    throw new ApplicationError('Invite Member', 'Invite failed');
  }
};

export const useResendInvitation = () => {
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const revokeMutation = useMutation({
    mutationFn: revokeInvitation,
  });

  const inviteMemberMutation = useMutation({
    mutationFn: inviteMember,
  });

  const resendInvitation = async (email: string, invitationId: string) => {
    try {
      await revokeMutation.mutateAsync({ email, invitationId });
      await inviteMemberMutation.mutateAsync({
        invitee_email: email,
        orgId: selectedOrganization?.id!,
      });
      toast.success('Invitation Resent');
    } catch (error) {
      toast.error('Error Resending');
    }
  };

  return {
    resendInvitation,
  };
};
