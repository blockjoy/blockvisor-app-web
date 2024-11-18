import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { toast } from 'react-toastify';
import {
  Protocol,
  ProtocolVersion,
} from '@modules/grpc/library/blockjoy/v1/protocol';
import { Host, RegionInfo } from '@modules/grpc/library/blockjoy/v1/host';
import { NodeServiceCreateRequest } from '@modules/grpc/library/blockjoy/v1/node';
import { hostAtoms, useHostSelect } from '@modules/host';
import {
  useNodeAdd,
  nodeLauncherAtoms,
  useGetRegions,
  NodeLauncherHost,
  NodeLauncherState,
  NodePropertyGroup,
  sortVersions,
  NodeLauncherRegion,
  nodeLauncherSelectors,
} from '@modules/node';
import { organizationSelectors } from '@modules/organization';
import { ROUTES, useNavigate } from '@shared/index';
import { Mixpanel } from '@shared/services/mixpanel';
import { usePricing } from '@modules/billing';
import { ResourceAffinity } from '@modules/grpc/library/blockjoy/common/v1/node';
import { imageClient, protocolClient } from '@modules/grpc';
import { authSelectors } from '@modules/auth';

type IUseNodeLauncherHandlersParams = {
  fulfilReqs: boolean;
  resetFulfilReqs: VoidFunction;
};

interface IUseNodeLauncherHandlersHook {
  handleHostsChanged: (hosts: NodeLauncherHost[] | null) => void;
  handleRegionsChanged: (regions: NodeLauncherRegion[] | null) => void;
  handleRegionsLoaded: (regionInfo: RegionInfo | null) => void;
  handleProtocolSelected: (protocol: Protocol) => void;
  handleNodePropertyChanged: <K extends keyof NodeLauncherState>(
    name: K,
    value: NodeLauncherState[K],
  ) => void;
  handleNodeConfigPropertyChanged: (
    key: string,
    keyGroup: string,
    value: string | boolean,
  ) => void;
  handleVersionChanged: (version: ProtocolVersion) => void;
  handleVariantChanged: (variant: string) => void;
  handleCreateNodeClicked: () => void;
}

export const useNodeLauncherHandlers = ({
  fulfilReqs,
  resetFulfilReqs,
}: IUseNodeLauncherHandlersParams): IUseNodeLauncherHandlersHook => {
  const searchParams = useSearchParams();
  const { navigate } = useNavigate();

  const { getHosts } = useHostSelect();
  const { createNode } = useNodeAdd();
  const { getRegions } = useGetRegions();
  const { getPrice } = usePricing();

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const allHosts = useRecoilValue(hostAtoms.allHosts);

  const totalNodesToLaunch = useRecoilValue(
    nodeLauncherSelectors.totalNodesToLaunch,
  );

  const [selectedProtocol, setSelectedProtocol] = useRecoilState(
    nodeLauncherAtoms.selectedProtocol,
  );
  const [nodeLauncherState, setNodeLauncherState] = useRecoilState(
    nodeLauncherAtoms.nodeLauncher,
  );
  const resetNodeLauncherState = useResetRecoilState(
    nodeLauncherAtoms.nodeLauncher,
  );
  const [error, setError] = useRecoilState(nodeLauncherAtoms.error);
  const setIsLaunchError = useSetRecoilState(nodeLauncherAtoms.isLaunchError);
  const setIsLaunching = useSetRecoilState(nodeLauncherAtoms.isLaunching);
  const [selectedHosts, setSelectedHosts] = useRecoilState(
    nodeLauncherAtoms.selectedHosts,
  );
  const [selectedVersion, setSelectedVersion] = useRecoilState(
    nodeLauncherAtoms.selectedVersion,
  );
  const resetSelectedVersion = useResetRecoilState(
    nodeLauncherAtoms.selectedVersion,
  );
  const [selectedRegions, setSelectedRegions] = useRecoilState(
    nodeLauncherAtoms.selectedRegions,
  );

  const [selectedImage, setSelectedImage] = useRecoilState(
    nodeLauncherAtoms.selectedImage,
  );

  const setVariants = useSetRecoilState(nodeLauncherAtoms.variants);
  const [versions, setVersions] = useRecoilState(nodeLauncherAtoms.versions);

  const [selectedVariant, setSelectedVariant] = useRecoilState(
    nodeLauncherAtoms.selectedVariant,
  );

  const resetSelectedImage = useResetRecoilState(
    nodeLauncherAtoms.selectedImage,
  );

  useEffect(() => {
    if (error) resetError();
  }, [
    selectedProtocol,
    selectedRegions,
    selectedHosts,
    selectedVariant,
    selectedVersion,
    selectedImage,
  ]);

  useEffect(() => {
    setSelectedHosts(null);
  }, [allHosts]);

  useEffect(() => {
    let queriedHost = null;
    const hostId = searchParams.get('hostId');

    if (hostId) {
      queriedHost =
        allHosts.find((host: Host) => host.hostId === hostId) ?? null;

      if (queriedHost) {
        const isValid = queriedHost.ipAddresses.some((host) => !host.assigned);

        setSelectedHosts([
          {
            nodesToLaunch: 1,
            host: queriedHost!,
            isValid,
          },
        ]);
      }
    }
  }, [allHosts]);

  useEffect(() => {
    if (!selectedProtocol) return;
    setSelectedVersion(sortVersions(versions)[0]);
  }, [selectedProtocol]);

  useEffect(() => {
    if (!selectedImage) return;

    const properties: NodePropertyGroup[] = [];

    const keyGroups = Array.from(
      new Set(
        selectedImage?.properties
          ?.filter((property) => property.keyGroup)
          ?.map((property) => property.keyGroup),
      ),
    );

    const propertiesWithoutKeyGroup: NodePropertyGroup[] =
      selectedImage?.properties
        .filter((property) => !property.keyGroup)
        .map((property) => ({
          key: property.key,
          uiType: property.uiType,
          value: property.defaultValue || '',
          properties: [property],
          displayName: property.displayName!,
          displayGroup: property.displayGroup,
        })) ?? [];

    properties.push(...propertiesWithoutKeyGroup!);

    for (let keyGroup of keyGroups) {
      const keyGroupProperties = selectedImage?.properties.filter(
        (property) => property.keyGroup === keyGroup,
      );

      const firstProperty = keyGroupProperties?.[0];

      if (!firstProperty) return;

      const defaultProperty = selectedImage?.properties.find(
        (property) => property.keyGroup === keyGroup && property.isGroupDefault,
      );

      properties.push({
        key: defaultProperty?.key!,
        keyGroup: keyGroup!,
        uiType: firstProperty.uiType,
        value: defaultProperty?.key!,
        properties: keyGroupProperties!,
        displayName: firstProperty.displayName!,
        displayGroup: defaultProperty?.displayGroup,
      });
    }

    const firewall = selectedImage?.firewall?.rules! ?? [];

    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      properties,
      firewall,
    }));
  }, [selectedImage]);

  useEffect(() => {
    (async () => {
      if (!selectedVersion) return;

      const imageResponse = await imageClient.getImage({
        versionKey: selectedVersion.versionKey,
        semanticVersion: selectedVersion.semanticVersion,
        orgId: defaultOrganization?.orgId,
      });

      setSelectedImage(imageResponse.image!);
    })();
  }, [selectedVersion]);

  useEffect(() => {
    (async () => {
      if (!defaultOrganization || !selectedProtocol) return;

      const variantsResponse = await protocolClient.listVariants({
        protocolId: selectedProtocol?.protocolId!,
        orgId: defaultOrganization?.orgId,
      });

      setVariants(variantsResponse);
      setSelectedVariant(variantsResponse[0]);
    })();
  }, [selectedProtocol, defaultOrganization]);

  useEffect(() => {
    if (selectedVersion && selectedRegions && defaultOrganization)
      getPrice({
        regionId: isSuperUser
          ? ''
          : selectedRegions[0]?.regionInfo?.region?.regionId!,
        versionKey: selectedVersion.versionKey,
        orgId: defaultOrganization?.orgId,
      });
  }, [selectedProtocol, selectedVersion, selectedRegions]);

  useEffect(() => {
    if (fulfilReqs) handleCreateNodeClicked();
  }, [fulfilReqs]);

  useEffect(() => {
    Mixpanel.track('Launch Node - Opened');
  }, []);

  useEffect(() => {
    if (!isSuperUser && !defaultOrganization?.orgId) {
      return;
    }

    getHosts(isSuperUser ? undefined : defaultOrganization?.orgId);
  }, [defaultOrganization?.orgId, isSuperUser]);

  useEffect(() => {
    if (defaultOrganization?.orgId && selectedImage) getRegions();
  }, [defaultOrganization?.orgId, selectedImage]);

  useEffect(() => {
    if (selectedVariant && selectedProtocol) {
      (async () => {
        const versionsResponse = await protocolClient.listVersions({
          versionKey: {
            protocolKey: selectedProtocol?.key,
            variantKey: selectedVariant,
          },
          orgId: defaultOrganization?.orgId,
        });

        setVersions(versionsResponse);
        setSelectedVersion(sortVersions(versionsResponse)[0]);
      })();
    }
  }, [selectedVariant]);

  const handleHostsChanged = (hosts: NodeLauncherHost[] | null) => {
    Mixpanel.track('Launch Node - Host Changed');
    setSelectedHosts(hosts);
    setSelectedRegions(null);
  };

  const handleRegionsChanged = (regions: NodeLauncherRegion[] | null) => {
    Mixpanel.track('Launch Node - Region Changed');
    setSelectedRegions(regions);
  };

  const handleRegionsLoaded = (regionInfo: RegionInfo | null) => {
    if (!isSuperUser) {
      setSelectedRegions([
        {
          nodesToLaunch: 1,
          regionInfo: regionInfo!,
        },
      ]);
    }
  };

  const handleProtocolSelected = (protocol: Protocol) => {
    setSelectedProtocol(protocol);

    Mixpanel.track('Launch Node - Protocol Selected', {
      protocol: protocol.name,
    });
  };

  const handleNodePropertyChanged = <K extends keyof NodeLauncherState>(
    name: K,
    value: NodeLauncherState[K],
  ) => {
    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      [name]: value,
    }));

    Mixpanel.track('Launch Node - Property Changed', {
      propertyName: name,
      propertyValue: value,
    });
  };

  const handleNodeConfigPropertyChanged = (
    key: string,
    keyGroup: string,
    value: boolean | string,
  ) => {
    setError('');
    setIsLaunchError(false);

    console.log('handleNodeConfigPropertyChanged', { key, keyGroup, value });

    if (!nodeLauncherState.properties) return;

    const propertiesCopy = [...nodeLauncherState.properties!];

    const propertyIndex = propertiesCopy.findIndex(
      (property) => property.keyGroup === keyGroup,
    );

    if (propertyIndex === -1) return;

    const updatedProperty = {
      ...propertiesCopy[propertyIndex],
      key,
      value: value?.toString(),
    };

    propertiesCopy[propertyIndex] = updatedProperty;

    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      properties: propertiesCopy,
    }));

    Mixpanel.track('Launch Node - Node Config Property Changed', {
      propertyName: updatedProperty.keyGroup,
      propertyValue: value?.toString(),
    });
  };

  const handleVersionChanged = (version: ProtocolVersion) => {
    Mixpanel.track('Launch Node - Version Changed');
    setSelectedVersion(version);
  };

  const handleVariantChanged = (variant: string) => setSelectedVariant(variant);

  const handleCreateNodeClicked = async () => {
    setIsLaunching(true);

    const isSingleNode = totalNodesToLaunch === 1;

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.orgId,
      imageId: selectedImage?.imageId!,
      newValues: nodeLauncherState.properties?.map((property) => ({
        key: property.key,
        value: property.value,
      }))!,
      launcher: {},
      addRules: nodeLauncherState.firewall,
    };

    console.log('createNodeParams', params);

    if (selectedHosts?.length!) {
      params.launcher = {
        byHost: {
          hostCounts: selectedHosts.map(
            ({ host: { hostId }, nodesToLaunch: nodeCount }) => ({
              hostId,
              nodeCount,
            }),
          ),
        },
      };
    } else {
      params.launcher = {
        byRegion: {
          regionCounts: selectedRegions?.map(
            ({ regionInfo, nodesToLaunch: nodeCount }) => ({
              regionId: regionInfo.region?.regionId!,
              nodeCount,
              resource: ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
            }),
          )!,
        },
      };
    }

    await createNode(
      params,
      (nodeId: string) => {
        Mixpanel.track('Launch Node - Node Launched');

        if (!isSingleNode) toast.success('All nodes launched');

        navigate(isSingleNode ? ROUTES.NODE(nodeId) : ROUTES.NODES, () => {
          resetNodeLauncherState();
          resetSelectedVersion();
          resetSelectedImage();
        });
      },
      (error: string) => setError(error!),
    );
  };

  const resetError = () => {
    resetFulfilReqs();
    setError(null);
    setIsLaunchError(false);
    setIsLaunching(false);
  };

  return {
    handleHostsChanged,
    handleRegionsChanged,
    handleRegionsLoaded,
    handleProtocolSelected,
    handleNodePropertyChanged,
    handleNodeConfigPropertyChanged,
    handleVersionChanged,
    handleVariantChanged,
    handleCreateNodeClicked,
  };
};
