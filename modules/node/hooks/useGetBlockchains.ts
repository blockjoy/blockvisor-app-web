import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organization';
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

    if (!isStatusResponse(response)) {
      setBlockchains(response);
      setLoadingState('finished');
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
