import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organizations';
import { useRecoilState } from 'recoil';
import { hostsAtoms } from '../store/hostAtoms';

export function useDeleteHost() {
  const [loadingHostState, setLoadingHost] = useRecoilState(
    hostsAtoms.hostLoading,
  );
  const deleteHost = async (hostId: string) => {
    setLoadingHost('loading');
    const response = await apiClient.execDeleteHost(hostId);

    if (isStatusResponse(response)) {
      setLoadingHost('finished');
      throw new ApplicationError('DeleteHost', response.message);
    }

    setLoadingHost('finished');
    return;
  };

  return {
    deleteHost,
    loading:
      loadingHostState === 'initializing' || loadingHostState === 'loading',
    finished: loadingHostState === 'finished',
  };
}
