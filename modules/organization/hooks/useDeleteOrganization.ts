import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { SetterOrUpdater, useRecoilState } from 'recoil';
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
    const response = await apiClient.deleteOrganization(id);

    /* TODO: temporary fix - API for node deletion doesn't return success response, but instead code 25 (Record not found) */
    if (isResponeMetaObject(response) || response?.code === 25) {
      removeFromOrganizations(id);
      try {
        removeOrganization(id);
        setLoadingState('finished');
      } catch (error) {
        console.log('Error switching org: ', error);
      }
      toast.success('Deleted successfully');
    } else {
      setLoadingState('finished');
      toast.error('Delete failed');
      throw new ApplicationError('DeleteOrganization', 'Delete Failed');
    }
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
