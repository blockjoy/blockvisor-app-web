import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organization';
import { env } from '@shared/constants/env';
import { delay } from '@shared/utils/delay';
import { useRecoilState } from 'recoil';
import { blockchainsAtoms } from '../store/blockchains';

export function useGetBlockchains() {
  const [blockchains, setBlockchains] = useRecoilState(
    blockchainsAtoms.blockchains,
  );
  const [loadingState, setLoadingState] = useRecoilState(
    blockchainsAtoms.blockchainsLoadingState,
  );

  const getBlockchains = async () => {
    setLoadingState('loading');
    const response: any = await apiClient.getBlockchains();

    await delay(env.loadingDuration);

    if (!isStatusResponse(response)) {
      setBlockchains(response);
      setLoadingState('finished');
    } else if (response?.message.includes('token')) {
      // token has expired
      localStorage.clear();
      window.location.href = '/';
    } else {
      setBlockchains([]);
      setLoadingState('finished');
    }
  };

  return {
    getBlockchains,
    loading: loadingState === 'initializing' || loadingState === 'loading',
    blockchains,
  };
}
