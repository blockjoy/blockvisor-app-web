import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient } from '@modules/grpc';
import { organizationSelectors } from '@modules/organization';
import { nodeAtoms, nodeLauncherAtoms } from '@modules/node';

type UseGetRegionsHook = {
  getRegions: () => Promise<void>;
  regions: Region[];
  regionsLoadingState: LoadingState;
};

export const useGetRegions = (): UseGetRegionsHook => {
  const [regions, setRegions] = useRecoilState(nodeAtoms.regions);
  const [regionsLoadingState, setRegionsLoadingState] = useRecoilState(
    nodeAtoms.regionsLoadingState,
  );

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const version = useRecoilValue(nodeLauncherAtoms.selectedVersion);

  const { blockchainId, nodeType } = nodeLauncher;

  const getRegions = async () => {
    try {
      setRegionsLoadingState('loading');

      const response = await hostClient.listRegions(
        defaultOrganization?.id!,
        blockchainId!,
        nodeType!,
        version?.version!,
      );

      setRegions(response);
    } catch (err) {
      console.log('Error occurred while fetching regions', err);
      setRegions([]);
    } finally {
      setRegionsLoadingState('finished');
    }
  };

  return {
    getRegions,
    regions,
    regionsLoadingState,
  };
};
