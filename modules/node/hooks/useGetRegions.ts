import { useRecoilState, useRecoilValue } from 'recoil';
import { Image } from '@modules/grpc/library/blockjoy/v1/image';
import { hostClient } from '@modules/grpc';
import { organizationSelectors } from '@modules/organization';
import { nodeAtoms } from '@modules/node';

export const useGetRegions = () => {
  const [regions, setRegions] = useRecoilState(nodeAtoms.regions);
  const [regionsLoadingState, setRegionsLoadingState] = useRecoilState(
    nodeAtoms.regionsLoadingState,
  );

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const getRegions = async (image?: Image | null) => {
    try {
      setRegionsLoadingState('loading');

      const response = await hostClient.listRegions(
        defaultOrganization?.orgId!,
        image?.imageId!,
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
