import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { invitationClient } from '@modules/grpc';
import { organizationSelectors } from '../store/organizationSelectors';

export const useInviteMembers = () => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const inviteMembers = async (
    inviteeEmail: string,
    onComplete: VoidFunction,
  ) => {
    const formattedEmail = inviteeEmail?.toLowerCase();
    try {
      await invitationClient.inviteOrgMember(
        formattedEmail,
        defaultOrganization?.orgId!,
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
