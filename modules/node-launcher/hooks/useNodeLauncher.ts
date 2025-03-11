import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import { nodeLauncherAtoms } from '../store/nodeLauncherAtoms';
import { useEffect } from 'react';
import { organizationSelectors } from '@modules/organization';
import { useProtocols } from './useProtocols';
import { nodeAtoms, useGetRegions, useNodeAdd } from '@modules/node';
import { NodeServiceCreateRequest } from '@modules/grpc/library/blockjoy/v1/node';
import { ROUTES, useNavigate } from '@shared/index';
import { Mixpanel } from '@shared/services/mixpanel';
import { toast } from 'react-toastify';
import { nodeLauncherSelectors } from '../store/nodeLauncherSelectors';
import { ResourceAffinity } from '@modules/grpc/library/blockjoy/common/v1/node';
import { usePricing } from '@modules/billing';

export const useNodeLauncher = () => {
  const [selectedProtocol, setSelectedProtocol] = useRecoilState(
    nodeLauncherAtoms.selectedProtocol,
  );
  const [selectedVariant, setSelectedVariant] = useRecoilState(
    nodeLauncherAtoms.selectedVariant,
  );
  const selectedRegion = useRecoilValue(nodeLauncherAtoms.selectedRegion);
  const resetRegions = useResetRecoilState(nodeAtoms.regions);

  const selectedVersion = useRecoilValue(nodeLauncherSelectors.selectedVersion);
  const image = useRecoilValue(nodeLauncherAtoms.image);

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const properties = useRecoilValue(nodeLauncherAtoms.properties);
  const firewall = useRecoilValue(nodeLauncherAtoms.firewall);

  const setIsLaunching = useSetRecoilState(nodeLauncherAtoms.isLaunching);

  const { getVariants, getVersions, getImage } = useProtocols();
  const { getRegions } = useGetRegions();

  const { createNode } = useNodeAdd();

  const { getPrice } = usePricing();

  const updateProtocol = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
  };

  const { navigate } = useNavigate();

  const [error, setError] = useRecoilState(nodeLauncherAtoms.error);

  useEffect(() => {
    setSelectedVariant(null);
    resetRegions();
  }, [selectedProtocol]);

  useEffect(() => {
    getVariants();
  }, [selectedProtocol, defaultOrganization?.orgId]);

  useEffect(() => {
    getVersions();
  }, [selectedVariant, defaultOrganization?.orgId]);

  useEffect(() => {
    getImage();
  }, [selectedVersion]);

  useEffect(() => {
    getRegions(image);
  }, [image, defaultOrganization?.orgId]);

  useEffect(() => {
    console.log(selectedVersion);
    console.log(selectedRegion);
    console.log(defaultOrganization);
    console.log(selectedVersion && selectedRegion && defaultOrganization);
    if (selectedVersion && selectedRegion && defaultOrganization)
      getPrice({
        regionId: selectedRegion?.region?.regionId!,
        versionKey: selectedVersion.versionKey,
        orgId: defaultOrganization?.orgId,
      });
  }, [
    selectedProtocol,
    selectedVersion,
    selectedRegion,
    defaultOrganization?.orgId,
  ]);

  const handleLaunchNode = async () => {
    setIsLaunching(true);

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.orgId,
      imageId: image?.imageId!,
      newValues: properties?.map((property) => ({
        key: property.key,
        value: property.value,
      }))!,
      launcher: {
        byRegion: {
          regionCounts: [
            {
              regionId: selectedRegion?.region?.regionId!,
              nodeCount: 1,
              resource: ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
            },
          ],
        },
      },
      addRules: firewall,
    };

    // console.log('PARAMS NEW', params);

    await createNode(
      params,
      (nodeId: string) => {
        Mixpanel.track('Launch Node - Node Launched');

        toast.success('Node launched');

        navigate(ROUTES.NODE(nodeId), () => {});
      },
      (error: string) => setError(error!),
    );
  };

  return {
    updateProtocol,
    handleLaunchNode,
  };
};
