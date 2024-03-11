import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { blockchainClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';
import { blockchainAtoms } from '@modules/node';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { usePermissions } from '@modules/auth';

type UseGetBlockchainsHook = {
  blockchains: Blockchain[];
  blockchainsLoadingState: LoadingState;
};

export const useGetBlockchains = (): UseGetBlockchainsHook => {
  const { hasPermission } = usePermissions();
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
    const response = await blockchainClient.listBlockchains(
      defaultOrganization?.id!,
    );

    return response;
  };

  const canList = hasPermission('blockchain-list');

  useSWR(
    () =>
      canList && defaultOrganization?.id
        ? `blockchains_${defaultOrganization.id}`
        : null,
    fetcher,
    {
      revalidateOnMount: true,

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
