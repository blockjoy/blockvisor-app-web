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
  const userId = repository?.getIdentity()?.userId;

  const leaveOrganization = async (
    orgId: string,
    onSuccess: VoidFunction,
    onError: VoidFunction,
  ) => {
    setLoadingState('loading');
    try {
      await organizationClient.removeMember(userId!, orgId);
      setLoadingState('finished');
      toast.success('Successfully left the organization');
      onSuccess();
    } catch (error) {
      setLoadingState('finished');
      toast.error('Error leaving organization');
      onError();
    }
  };

  return {
    loading: loadingState === 'initializing' || loadingState === 'loading',
    leaveOrganization,
  };
}
