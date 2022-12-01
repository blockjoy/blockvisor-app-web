import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organizations';
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
    const response = await apiClient.getBlockchains();
    if (response && isStatusResponse(response)) {
      setLoadingState('finished');
      setBlockchains([]);
      // add some error handling
      //throw new ApplicationError('GetBlockchains', response.message);
    } else {
      await delay(1000);
      setBlockchains(response ?? []);
      setLoadingState('finished');
    }
  };

  return {
    getBlockchains,
    loading: loadingState === 'initializing' || loadingState === 'loading',
    blockchains,
  };
}
