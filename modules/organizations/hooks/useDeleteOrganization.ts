import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';

export function useDeleteOrganization() {
  const [loadingState, setLoadingState] = useRecoilState(
    organisationAtoms.organizationLoadingState,
  );

  const deleteOrganization = async (id: string) => {
    setLoadingState('loading');

    const response = await apiClient.deleteOrganization(id);
    if (isResponeMetaObject(response)) {
      setLoadingState('finished');
    } else {
      setLoadingState('finished');
      throw new ApplicationError('DeleteOrganization', 'Delete Failed');
    }
  };

  return {
    loading: loadingState === 'initializing' || loadingState === 'loading',
    deleteOrganization,
  };
}
