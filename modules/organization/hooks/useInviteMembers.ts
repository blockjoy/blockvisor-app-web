import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';

export const useInviteMembers = () => {
  const inviteMembers = async (emails: string[]) => {
    // const response = await apiClient.inviteMembers();
    // if (isResponeMetaObject(response)) {
    //   return;
    // } else {
    //   throw new ApplicationError('UpdateOrganization', 'Update failed');
    // }
  };

  return {
    inviteMembers,
  };
};
