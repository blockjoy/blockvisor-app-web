import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organization';
import { useRecoilState } from 'recoil';
import { hostsAtoms } from '../store/hostAtoms';

export function useStartHost() {
  const [loadingHostState, setLoadingHost] = useRecoilState(
    hostsAtoms.hostLoading,
  );
  const startHost = async (hostId: string) => {
    setLoadingHost('loading');
    const response = await apiClient.execStartHost(hostId);

    if (isStatusResponse(response)) {
      setLoadingHost('finished');
      throw new ApplicationError('StartHost', response.message);
    }

    setLoadingHost('finished');
    return;
  };

  return {
    startHost,
    loading:
      loadingHostState === 'initializing' || loadingHostState === 'loading',
    finished: loadingHostState === 'finished',
  };
}
