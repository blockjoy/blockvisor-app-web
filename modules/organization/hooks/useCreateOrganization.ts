import { ResponseMeta } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { organizationClient } from '@modules/grpc';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';

// used for generating mock member count

function isSuccess(response: ResponseMeta.AsObject) {
  return response.status === ResponseMeta.Status.STATUS_SUCCESS;
}

export function useCreateOrganization() {
  const createOrganization = async (
    name: string,
    onSuccess: (org: any) => void,
  ) => {
    try {
      const org = await organizationClient.createOrganization(name);
      onSuccess(org);
    } catch (err) {
      throw new ApplicationError('CreateOrganization', 'Creation failed');
    }
  };

  return createOrganization;
}
