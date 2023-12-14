import { useState } from 'react';
import { hostClient } from '@modules/grpc';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { useDefaultOrganization } from '@modules/organization';

type UseGetRegionHook = {
  regions: Region[];
  isLoading: boolean;
  error: string | null;
  getRegions: (
    version: BlockchainVersion,
    blockchainId: string,
    nodeType: NodeType,
  ) => Promise<void>;
};

export const useGetRegions = (): UseGetRegionHook => {
  const [error, setError] = useState<string | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { defaultOrganization } = useDefaultOrganization();

  const getRegions = async (
    version: BlockchainVersion,
    blockchainId: string,
    nodeType: NodeType,
  ): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  return {
    regions,
    isLoading,

    error,

    getRegions,
  };
};
