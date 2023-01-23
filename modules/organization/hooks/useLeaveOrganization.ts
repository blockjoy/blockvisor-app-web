import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useGetOrganizations } from './useGetOrganizations';

export function useLeaveOrganization() {
  const { updateOrganizations } = useGetOrganizations();

  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const leaveOrganization = async (org_id: string) => {
    setLoadingState('loading');
    try {
      await apiClient.leaveOrganization(org_id);

      updateOrganizations(org_id);

      setLoadingState('finished');
      toast.success('Successfully left the organization');
    } catch (error) {
      setLoadingState('finished');
      toast.error('Error while leaving the organization');
    }
  };

  return {
    loading: loadingState === 'initializing' || loadingState === 'loading',
    leaveOrganization,
  };
}
