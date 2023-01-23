import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useGetOrganizations } from './useGetOrganizations';

export function useDeleteOrganization() {
  const { updateOrganizations } = useGetOrganizations();

  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const deleteOrganization = async (id: string) => {
    setLoadingState('loading');
    const response = await apiClient.deleteOrganization(id);
    console.log('response', response);

    if (isResponeMetaObject(response)) {
      updateOrganizations(id);

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
