import { organizationClient } from '@modules/grpc';
import { ApplicationError } from '@modules/auth/utils/Errors';

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
