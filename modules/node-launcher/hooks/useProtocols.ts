import { useRecoilState, useRecoilValue } from 'recoil';
import { imageClient, protocolClient } from '@modules/grpc';
import { organizationSelectors } from '@modules/organization';
import { nodeLauncherAtoms } from '../store/nodeLauncherAtoms';
import { nodeLauncherSelectors } from '../store/nodeLauncherSelectors';

export const useProtocols = () => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const [variants, setVariants] = useRecoilState(nodeLauncherAtoms.variants);
  const [variantsLoadingState, setVariantsLoadingState] = useRecoilState(
    nodeLauncherAtoms.variantsLoadingState,
  );
  const [versions, setVersions] = useRecoilState(nodeLauncherAtoms.versions);
  const [versionsLoadingState, setVersionsLoadingState] = useRecoilState(
    nodeLauncherAtoms.versionsLoadingState,
  );
  const [image, setImage] = useRecoilState(nodeLauncherAtoms.image);
  const [imageLoadingState, setImageLoadingState] = useRecoilState(
    nodeLauncherAtoms.imageLoadingState,
  );

  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);
  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);
  const selectedVersion = useRecoilValue(nodeLauncherSelectors.selectedVersion);

  const getVariants = async () => {
    try {
      setVariantsLoadingState('initializing');
      const response = await protocolClient.listVariants({
        protocolId: selectedProtocol?.protocolId!,
        orgId: defaultOrganization?.orgId,
      });

      setVariants(response);
      console.log('getVariants', response);
    } catch (error: any) {
      setVariants([]);
      console.log('Error caught while fetching variants: ', error);
    } finally {
      setVariantsLoadingState('finished');
    }
  };

  const getVersions = async () => {
    try {
      if (!selectedProtocol || !selectedVariant) return;

      console.log('selectedProtocol', selectedProtocol);
      console.log('selectedVariant', selectedVariant);

      setVersionsLoadingState('initializing');
      const response = await protocolClient.listVersions({
        versionKey: {
          protocolKey: selectedProtocol?.key,
          variantKey: selectedVariant,
        },
        orgId: defaultOrganization?.orgId,
      });

      setVersions(response);
      console.log('getVersions', response);
    } catch (error: any) {
      setVersions([]);
      console.log('Error caught while fetching versions: ', error);
    } finally {
      setVersionsLoadingState('finished');
    }
  };

  const getImage = async () => {
    try {
      if (!selectedVersion) return;

      console.log('selectedVersion', selectedVersion);

      setImageLoadingState('initializing');

      const response = await imageClient.getImage({
        versionKey: selectedVersion.versionKey,
        semanticVersion: selectedVersion.semanticVersion,
        orgId: defaultOrganization?.orgId,
      });

      setImage(response?.image ?? null);
      console.log('getImage', image);
    } catch (error: any) {
      setImage(null);
      console.log('Error caught while fetching image: ', error);
    } finally {
      setImageLoadingState('finished');
    }
  };

  return {
    variants,
    variantsLoadingState,
    versions,
    versionsLoadingState,
    image,
    imageLoadingState,
    getVariants,
    getVersions,
    getImage,
  };
};
