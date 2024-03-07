import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { blockchainClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';
import { blockchainAtoms } from '@modules/node';
import { checkForTokenError } from 'utils/checkForTokenError';

export function useGetBlockchains() {
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const [blockchains, setBlockchains] = useRecoilState(
    blockchainAtoms.blockchains,
  );
  const [blockchainsLoadingState, setBlockchainsLoadingState] = useRecoilState(
    blockchainAtoms.blockchainsLoadingState,
  );

  const fetcher = async () => {
    const response = await blockchainClient.getBlockchains(
      defaultOrganization?.id!,
    );

    checkForTokenError(blockchains);

    return response;
  };

  useSWR(() => (defaultOrganization?.id ? 'blockchains' : null), fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,

    onSuccess: (data) => {
      setBlockchains(data);
      setBlockchainsLoadingState('finished');
    },
    onError: (error) => {
      console.error('Failed to fetch Blockchains', error);
      setBlockchains([]);
      setBlockchainsLoadingState('finished');
    },
  });

  return {
    blockchains,
    blockchainsLoadingState,
  };
}
