import { ApplicationError } from '@modules/auth/utils/Errors';
import { organizationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useGetOrganizations } from './useGetOrganizations';

export function useDeleteOrganization(): IDeleteOrganizationHook {
  const { removeFromOrganizations } = useGetOrganizations();
  const deleteOrganization = async (id: string, callback?: VoidFunction) => {
    try {
      await organizationClient.deleteOrganization(id);
      removeOrganization(id);
      toast.success('Deleted successfully');
      if (callback) {
        callback();
      }
    } catch (err: any) {
      toast.error('Delete failed');
      throw new ApplicationError('DeleteOrganization', err?.message);
    }
  };

  const removeOrganization = (id: string) => removeFromOrganizations(id);

  return {
    deleteOrganization,
    removeOrganization,
  };
}
