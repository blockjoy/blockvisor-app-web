import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { hostClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';
import {
  BlockchainSimpleWRegion,
  blockchainSelectors,
  nodeAtoms,
} from '@modules/node';

type UseGetRegionHook = {
  allRegions: BlockchainSimpleWRegion[];
  allRegionsLoadingState: LoadingState;
};

export const useGetRegions = (): UseGetRegionHook => {
  const [allRegions, setAllRegions] = useRecoilState(nodeAtoms.allRegions);
  const [allRegionsLoadingState, setAllRegionsLoadingState] = useRecoilState(
    nodeAtoms.allRegionsLoadingState,
  );
  const blockchainsByTypeAndVersion = useRecoilValue(
    blockchainSelectors.blockchainsByTypeAndVersion,
  );

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const fetcher = async () => {
    const responses = await Promise.all(
      blockchainsByTypeAndVersion.map(async (item) => {
        try {
          const { blockchainId, nodeType, version } = item;
          const response = await hostClient.listRegions(
            defaultOrganization?.id!,
            blockchainId!,
            nodeType!,
            version!,
          );
          return { blockchainId, version, nodeType, regions: response };
        } catch (innerErr) {
          console.error('Error fetching regions for item:', item, innerErr);
          return [];
        }
      }),
    );

    return responses.flat();
  };

  useSWR(
    () =>
      defaultOrganization?.id && Boolean(blockchainsByTypeAndVersion.length)
        ? `regions_${defaultOrganization.id}`
        : null,
    fetcher,
    {
      revalidateOnMount: true,

      onSuccess: (data) => {
        setAllRegions(data);
        setAllRegionsLoadingState('finished');
      },
      onError: (error) => {
        console.log('Error occured while fetching all regions', error);

        setAllRegions([]);
        setAllRegionsLoadingState('finished');
      },
    },
  );

  return {
    allRegions,
    allRegionsLoadingState,
  };
};
