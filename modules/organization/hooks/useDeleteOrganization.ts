import { ApplicationError } from '@modules/auth/utils/Errors';
import { organizationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useGetOrganizations } from './useGetOrganizations';
import { useSwitchOrganization } from './useSwitchOrganization';

export function useDeleteOrganization(): IDeleteOrganizationHook {
  const { organizations, removeFromOrganizations } = useGetOrganizations();
  const { switchOrganization } = useSwitchOrganization();

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

  const removeOrganization = (id: string) => {
    removeFromOrganizations(id);

    const newActiveOrganization = organizations[0];
    switchOrganization(newActiveOrganization.id!, newActiveOrganization.name!);
  };

  return {
    deleteOrganization,
    removeOrganization,
  };
}
