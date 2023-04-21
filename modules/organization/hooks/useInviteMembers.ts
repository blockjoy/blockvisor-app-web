import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { invitationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export const useInviteMembers = () => {
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const inviteMembers = async (
    inviteeEmail: string,
    onComplete: VoidFunction,
  ) => {
    const formattedEmail = inviteeEmail?.toLowerCase();
    try {
      await invitationClient.inviteOrgMember(
        formattedEmail,
        selectedOrganization?.id!,
      );
      toast.success('Invitation Sent');
      onComplete();
    } catch (err) {
      throw new ApplicationError('UpdateOrganization', 'Update failed');
    }
  };

  return {
    inviteMembers,
  };
};
