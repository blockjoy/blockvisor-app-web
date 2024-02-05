import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hostClient } from '@modules/grpc';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { organizationAtoms } from '@modules/organization';
import {
  BlockchainSimpleRegion,
  blockchainSelectors,
  nodeAtoms,
} from '@modules/node';

type UseGetRegionHook = {
  allRegions: BlockchainSimpleRegion[];
  allRegionsLoadingState: LoadingState;
  regions: Region[];
  isLoading: boolean;
  error: string | null;
  getRegions: (
    version: BlockchainVersion,
    blockchainId: string,
    nodeType: NodeType,
  ) => Promise<void>;
  getAllRegions: () => Promise<void>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export const useGetRegions = (): UseGetRegionHook => {
  const [error, setError] = useState<string | null>(null);
  const [regions, setRegions] = useRecoilState(nodeAtoms.regions);
  const [regionsLoadingState, setRegionsLoadingState] = useRecoilState(
    nodeAtoms.regionsLoadingState,
  );
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

  const getRegions = async (
    version: BlockchainVersion,
    blockchainId: string,
    nodeType: NodeType,
  ): Promise<void> => {
    try {
      setError(null);
      setRegionsLoadingState('initializing');

      if (version?.id) {
        const response: Region[] = await hostClient.getRegions(
          defaultOrganization?.id!,
          blockchainId,
          nodeType,
          version.version,
        );

        setRegions(response);

        if (!response.length) setError('Region List Empty');
      }
    } catch (err) {
      console.log('getRegionsError', err);
      setError('Error Loading Regions');
      setRegions([]);
    } finally {
      setRegionsLoadingState('finished');
    }
  };

  const getAllRegions = async () => {
    try {
      setAllRegionsLoadingState('initializing');

      const responses = await Promise.all(
        blockchainsByTypeAndVersion.map(async (item) => {
          try {
            const { blockchainId, nodeType, version } = item;
            const response = await hostClient.getRegions(
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

      setAllRegions(responses.flat());
    } catch (err) {
      console.log('Error occured while fetching all regions', err);
    } finally {
      setAllRegionsLoadingState('finished');
    }
  };

  return {
    allRegions,
    allRegionsLoadingState,

    regions,
    isLoading: regionsLoadingState !== 'finished',

    error,

    getRegions,
    getAllRegions,

    setError,
  };
};
