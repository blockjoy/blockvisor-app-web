import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useDeleteOrganization() {
  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const deleteOrganization = async (id: string) => {
    setLoadingState('loading');
    const response = await apiClient.deleteOrganization(id);

    console.log('deleteOrganization', response);

    /* TODO: temporary fix - API for node deletion doesn't return success response, but instead code 25 (Record not found) */
    if (isResponeMetaObject(response) || response?.code === 25) {
      setLoadingState('finished');
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
  };
}
