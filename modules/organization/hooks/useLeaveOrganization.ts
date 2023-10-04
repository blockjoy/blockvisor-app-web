import { useIdentityRepository } from '@modules/auth';
import { organizationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useLeaveOrganization() {
  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const leaveOrganization = async (orgId: string, callback: VoidFunction) => {
    setLoadingState('loading');
    try {
      await organizationClient.removeMember(userId!, orgId);
      setLoadingState('finished');
      toast.success('Successfully left the organization');
      callback();
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
