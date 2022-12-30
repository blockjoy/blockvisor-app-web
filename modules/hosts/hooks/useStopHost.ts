import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organization';
import { useRecoilState } from 'recoil';
import { hostsAtoms } from '../store/hostAtoms';

export function useStopHost() {
  const [loadingHostState, setLoadingHost] = useRecoilState(
    hostsAtoms.hostLoading,
  );
  const stopHost = async (hostId: string) => {
    setLoadingHost('loading');
    const response = await apiClient.execStopHost(hostId);

    if (isStatusResponse(response)) {
      setLoadingHost('finished');
      throw new ApplicationError('StoptHost', response.message);
    }

    setLoadingHost('finished');
    return;
  };

  return {
    stopHost,
    loading:
      loadingHostState === 'initializing' || loadingHostState === 'loading',
    finished: loadingHostState === 'finished',
  };
}
