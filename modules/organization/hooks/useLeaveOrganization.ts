import { organizationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useGetOrganizations } from './useGetOrganizations';

export function useLeaveOrganization() {
  const { removeFromOrganizations } = useGetOrganizations();

  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const leaveOrganization = async (org_id: string) => {
    setLoadingState('loading');
    try {
      await organizationClient.leaveOrganization(org_id);

      removeFromOrganizations(org_id);

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
