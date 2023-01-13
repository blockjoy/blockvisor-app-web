import { isResponeMetaObject, useIdentityRepository } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';

export const useInviteMembers = () => {
  const repository = useIdentityRepository();
  const org_id = repository?.getIdentity()?.defaultOrganization?.id;

  const inviteMembers = async (emails: string[], onComplete: VoidFunction) => {
    const response = await apiClient.inviteOrgMember(emails[0], org_id!);
    console.log('inviteMembers', response);

    if (isResponeMetaObject(response)) {
      onComplete();
    } else {
      throw new ApplicationError('UpdateOrganization', 'Update failed');
    }
  };

  return {
    inviteMembers,
  };
};
