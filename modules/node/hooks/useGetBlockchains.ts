import { blockchainClient } from '@modules/grpc';
import { useDefaultOrganization } from '@modules/organization';
import { useRecoilState } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { blockchainsAtoms } from '../store/blockchains';

export function useGetBlockchains() {
  const { defaultOrganization } = useDefaultOrganization();

  const [blockchains, setBlockchains] = useRecoilState(
    blockchainsAtoms.blockchains,
  );
  const [loadingState, setLoadingState] = useRecoilState(
    blockchainsAtoms.blockchainsLoadingState,
  );

  const getBlockchains = async () => {
    setLoadingState('loading');
    const blockchains: any = await blockchainClient.getBlockchains(
      defaultOrganization?.id!,
    );
    checkForTokenError(blockchains);

    if (blockchains?.length) {
      setBlockchains(blockchains);
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
