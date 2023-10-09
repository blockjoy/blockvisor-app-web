import { ApplicationError } from '@modules/auth/utils/Errors';
import { organizationClient } from '@modules/grpc';
import { toast } from 'react-toastify';

export function useDeleteOrganization(): IDeleteOrganizationHook {
  const deleteOrganization = async (id: string, callback?: VoidFunction) => {
    try {
      await organizationClient.deleteOrganization(id);
      toast.success('Deleted successfully');
      if (callback) {
        callback();
      }
    } catch (err: any) {
      toast.error('Delete failed');
      throw new ApplicationError('DeleteOrganization', err?.message);
    }
  };

  return {
    deleteOrganization,
  };
}
