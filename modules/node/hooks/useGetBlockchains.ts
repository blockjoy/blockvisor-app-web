import { useRecoilState, useRecoilValue } from 'recoil';
import { blockchainClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';
import { checkForTokenError } from 'utils/checkForTokenError';
import { blockchainAtoms } from '@modules/node';

export function useGetBlockchains() {
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const [blockchains, setBlockchains] = useRecoilState(
    blockchainAtoms.blockchains,
  );
  const [loadingState, setLoadingState] = useRecoilState(
    blockchainAtoms.blockchainsLoadingState,
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
