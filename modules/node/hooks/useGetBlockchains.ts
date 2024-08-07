import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { blockchainClient } from '@modules/grpc';
import { organizationSelectors } from '@modules/organization';
import { blockchainAtoms } from '@modules/node';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';

type UseGetBlockchainsHook = {
  blockchains: Blockchain[];
  blockchainsLoadingState: LoadingState;
};

export const useGetBlockchains = (): UseGetBlockchainsHook => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const [blockchains, setBlockchains] = useRecoilState(
    blockchainAtoms.blockchains,
  );
  const [blockchainsLoadingState, setBlockchainsLoadingState] = useRecoilState(
    blockchainAtoms.blockchainsLoadingState,
  );

  const fetcher = async () =>
    await blockchainClient.listBlockchains(defaultOrganization?.id!);

  useSWR(defaultOrganization?.id ? `blockchains` : null, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,

    onSuccess: (data) => {
      setBlockchains(data.blockchains);
      setBlockchainsLoadingState('finished');
    },
    onError: (error) => {
      console.log('Failed to fetch Blockchains', error);
      setBlockchains([]);
      setBlockchainsLoadingState('finished');
    },
  });

  return {
    blockchains,
    blockchainsLoadingState,
  };
};
