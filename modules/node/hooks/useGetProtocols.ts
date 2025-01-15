import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { protocolClient } from '@modules/grpc';
import { organizationSelectors } from '@modules/organization';
import { protocolAtoms } from '@modules/node';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';

type UseGetBlockchainsHook = {
  protocols: Protocol[];
  protocolsLoadingState: LoadingState;
};

export const useGetProtocols = (): UseGetBlockchainsHook => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const [protocols, setBlockchains] = useRecoilState(protocolAtoms.protocols);
  const [protocolsLoadingState, setBlockchainsLoadingState] = useRecoilState(
    protocolAtoms.protocolsLoadingState,
  );

  const fetcher = async () =>
    await protocolClient.listProtocols(defaultOrganization?.orgId!);

  useSWR(defaultOrganization?.orgId ? `protocols` : null, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,

    onSuccess: (data) => {
      setBlockchains(data.protocols);
      setBlockchainsLoadingState('finished');
    },
    onError: (error) => {
      console.log('Failed to fetch Blockchains', error);
      setBlockchains([]);
      setBlockchainsLoadingState('finished');
    },
  });

  return {
    protocols,
    protocolsLoadingState,
  };
};
