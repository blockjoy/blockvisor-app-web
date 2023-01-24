import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export const useInviteMembers = () => {
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const inviteMembers = async (emails: string[], onComplete: VoidFunction) => {
    const response = await apiClient.inviteOrgMember(
      emails[0],
      selectedOrganization?.id!,
    );

    if (isResponeMetaObject(response)) {
      toast.success(
        `You've invited ${emails[0]} to ${selectedOrganization?.name}! They'll be receiving an email shortly.`,
      );
      onComplete();
    } else {
      throw new ApplicationError('UpdateOrganization', 'Update failed');
    }
  };

  return {
    inviteMembers,
  };
};
