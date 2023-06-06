import { blockchainClient } from '@modules/grpc';
import { useRecoilState } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { blockchainsAtoms } from '../store/blockchains';

// TODO: REMOVE THIS HORRIFIC FUNCTION TO REMOVE DUPLICATE NODETYPES
const removeDuplicateNodeTypes = (blockchains: any[]) => {
  blockchains.forEach((b: any) => {
    let tempNodeTypes: any[] = [];
    b.nodesTypes.forEach((type: any) => {
      if (!tempNodeTypes.some((t) => t.nodeType === type.nodeType)) {
        tempNodeTypes.push(type);
      }
    });
    b.nodesTypes = tempNodeTypes;
  });
};

export function useGetBlockchains() {
  const [blockchains, setBlockchains] = useRecoilState(
    blockchainsAtoms.blockchains,
  );
  const [loadingState, setLoadingState] = useRecoilState(
    blockchainsAtoms.blockchainsLoadingState,
  );

  const getBlockchains = async () => {
    setLoadingState('loading');
    const blockchains: any = await blockchainClient.getBlockchains();
    console.log('getBlockchains', blockchains);
    checkForTokenError(blockchains);

    if (blockchains?.length) {
      removeDuplicateNodeTypes(blockchains);
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
