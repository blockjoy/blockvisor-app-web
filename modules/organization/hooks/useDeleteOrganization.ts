import { ApplicationError } from '@modules/auth/utils/Errors';
import { organizationClient } from '@modules/grpc';
import { toast } from 'react-toastify';

export function useDeleteOrganization(): IDeleteOrganizationHook {
  const deleteOrganization = async (
    id: string,
    onSuccess: VoidFunction,
    onError: VoidFunction,
  ) => {
    try {
      await organizationClient.deleteOrganization(id);
      toast.success('Deleted successfully');
      onSuccess();
    } catch (err: any) {
      toast.error('Delete failed');
      onError();
      throw new ApplicationError('DeleteOrganization', err?.message);
    }
  };

  return {
    deleteOrganization,
  };
}
