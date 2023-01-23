import {
  Organization,
  ResponseMeta,
} from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { apiClient } from '@modules/client';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';

// used for generating mock member count

function isSuccess(response: ResponseMeta.AsObject) {
  return response.status === ResponseMeta.Status.SUCCESS;
}

export function useCreateOrganization() {
  const createOrganization = async (
    name: string,
    onSuccess: (org: any) => void,
  ) => {
    const organization = new Organization();
    const uuid = Math.random().toString();
    organization.setId(uuid);
    organization.setName(name);

    const response = await apiClient.createOrganization(organization);

    if (
      isResponeMetaObject(response) &&
      isSuccess(response) &&
      response?.messagesList?.length
    ) {
      const orgId = response?.messagesList[0];
      const org: any = await apiClient.getOrganizations(orgId);
      console.log('found Org', org);
      onSuccess(org[0]);
    } else {
      throw new ApplicationError('CreateOrganization', 'Creation failed');
    }
  };

  return createOrganization;
}
