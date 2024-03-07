import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { blockchainClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';
import { blockchainAtoms } from '@modules/node';
import { checkForTokenError } from 'utils/checkForTokenError';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';

type UseGetBlockchainsHook = {
  blockchains: Blockchain[];
  blockchainsLoadingState: LoadingState;
};

export const useGetBlockchains = (): UseGetBlockchainsHook => {
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

  useSWR(
    () =>
      defaultOrganization?.id ? `blockchains_${defaultOrganization.id}` : null,
    fetcher,
    {
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
    },
  );

  return {
    blockchains,
    blockchainsLoadingState,
  };
};
