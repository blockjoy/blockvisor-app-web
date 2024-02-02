<<<<<<< HEAD
import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
=======
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
>>>>>>> a1f742f5 (feat: [sc-3018] payment authorization, [sc-3503] subscription metadata items, disabled credits)
import { hostClient } from '@modules/grpc';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { organizationAtoms } from '@modules/organization';
import { nodeAtoms } from '@modules/node';

type UseGetRegionHook = {
  regions: Region[];
  isLoading: boolean;
  error: string | null;
  getRegions: (
    version: BlockchainVersion,
    blockchainId: string,
    nodeType: NodeType,
  ) => Promise<void>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export const useGetRegions = (): UseGetRegionHook => {
  const [error, setError] = useState<string | null>(null);
  const [regions, setRegions] = useRecoilState(nodeAtoms.regions);
  const [regionsLoadingState, setRegionsLoadingState] = useRecoilState(
    nodeAtoms.regionsLoadingState,
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
        const regions: Region[] = await hostClient.getRegions(
          defaultOrganization?.id!,
          blockchainId,
          nodeType,
          version.version,
        );

        setRegions(regions);

        if (!regions.length) setError('Region List Empty');
      }
    } catch (err) {
      console.log('getRegionsError', err);
      setError('Error Loading Regions');
      setRegions([]);
    } finally {
      setRegionsLoadingState('finished');
    }
  };

  return {
    regions,
    isLoading: regionsLoadingState !== 'finished',

    error,

    getRegions,
    setError,
  };
};
