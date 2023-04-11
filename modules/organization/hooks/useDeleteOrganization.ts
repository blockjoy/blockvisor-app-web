import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useGetOrganizations } from './useGetOrganizations';
import { useSwitchOrganization } from './useSwitchOrganization';

export function useDeleteOrganization() {
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
      try {
        const newActiveOrganization = organizations[0];
        switchOrganization(
          newActiveOrganization.id!,
          newActiveOrganization.name!,
        );
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

  return {
    loading: loadingState === 'initializing' || loadingState === 'loading',
    deleteOrganization,
    setLoadingState,
  };
}
