import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organizations';
import { useRecoilState } from 'recoil';
import { hostsAtoms } from '../store/hostAtoms';

export function useRestartHost() {
  const [loadingHostState, setLoadingHost] = useRecoilState(
    hostsAtoms.hostLoading,
  );
  const restartHost = async (hostId: string) => {
    setLoadingHost('loading');
    const response = await apiClient.execRestartHost(hostId);

    if (isStatusResponse(response)) {
      setLoadingHost('finished');
      throw new ApplicationError('RestartHost', response.message);
    }

    setLoadingHost('finished');
    return;
  };

  return {
    restartHost,
    loading:
      loadingHostState === 'initializing' || loadingHostState === 'loading',
    finished: loadingHostState === 'finished',
  };
}
