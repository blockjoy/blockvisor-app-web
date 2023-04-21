import { ApplicationError } from '@modules/auth/utils/Errors';
import { organizationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useGetOrganizations } from './useGetOrganizations';
import { useSwitchOrganization } from './useSwitchOrganization';

export function useDeleteOrganization(): IDeleteOrganizationHook {
  const { organizations, removeFromOrganizations } = useGetOrganizations();
  const { switchOrganization } = useSwitchOrganization();

  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationDeleteLoadingState,
  );

  const deleteOrganization = async (id: string) => {
    setLoadingState('initializing');

    try {
      await organizationClient.deleteOrganization(id);
      removeOrganization(id);
      setLoadingState('finished');
      toast.success('Deleted successfully');
    } catch (err: any) {
      toast.error('Delete failed');
      throw new ApplicationError('DeleteOrganization', err?.message);
    }

    setLoadingState('finished');
  };

  const removeOrganization = (id: string) => {
    removeFromOrganizations(id);

    const newActiveOrganization = organizations[0];
    switchOrganization(newActiveOrganization.id!, newActiveOrganization.name!);
  };

  return {
    loading: loadingState === 'initializing' || loadingState === 'loading',
    deleteOrganization,
    removeOrganization,
    setLoadingState,
  };
}
