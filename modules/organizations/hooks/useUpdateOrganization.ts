import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';

export function useUpdateOrganization() {
  const updateOrganization = async (id: string, name: string) => {
    const organisation = new Organization();
    organisation.setName(name);
    organisation.setId(id);
    const response = await apiClient.updateOrganization(organisation);

    if (isResponeMetaObject(response)) {
      return;
    } else {
      throw new ApplicationError('UpdateOrganization', 'Update failed');
    }
  };

  return {
    updateOrganization,
  };
}
