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
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { NodeServiceCreateRequest } from '@modules/grpc/library/blockjoy/v1/node';
import { hostAtoms, useHostSelect } from '@modules/host';
import {
  useNodeAdd,
  nodeLauncherAtoms,
  useGetRegions,
  NodeLauncherHost,
  NodeLauncherState,
  NodePropertyGroup,
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
};

interface IUseNodeLauncherHandlersHook {
  handleHostsChanged: (hosts: NodeLauncherHost[] | null) => void;
  handleRegionChanged: (region: Region | null) => void;
  handleRegionsLoaded: (region: Region | null) => void;
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
  handleVersionChanged: (version: ProtocolVersion | null) => void;
  handleVariantChanged: (variant: string) => void;
  handleCreateNodeClicked: () => void;
}

export const useNodeLauncherHandlers = ({
  fulfilReqs,
}: IUseNodeLauncherHandlersParams): IUseNodeLauncherHandlersHook => {
  const searchParams = useSearchParams();
  const { navigate } = useNavigate();

  const { getHosts } = useHostSelect();
  const { createNode } = useNodeAdd();
  const { getRegions } = useGetRegions();
  const { getPrice } = usePricing();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const allHosts = useRecoilValue(hostAtoms.allHosts);

  const [selectedProtocol, setSelectedProtocol] = useRecoilState(
    nodeLauncherAtoms.selectedProtocol,
  );
  const [nodeLauncherState, setNodeLauncherState] = useRecoilState(
    nodeLauncherAtoms.nodeLauncher,
  );
  const resetNodeLauncherState = useResetRecoilState(
    nodeLauncherAtoms.nodeLauncher,
  );
  const setError = useSetRecoilState(nodeLauncherAtoms.error);
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
  const [selectedRegion, setSelectedRegion] = useRecoilState(
    nodeLauncherAtoms.selectedRegion,
  );

  const [selectedImage, setSelectedImage] = useRecoilState(
    nodeLauncherAtoms.selectedImage,
  );

  const setVariants = useSetRecoilState(nodeLauncherAtoms.variants);
  const setVersions = useSetRecoilState(nodeLauncherAtoms.versions);

  const [selectedVariant, setSelectedVariant] = useRecoilState(
    nodeLauncherAtoms.selectedVariant,
  );

  const resetSelectedImage = useResetRecoilState(
    nodeLauncherAtoms.selectedImage,
  );

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
    setSelectedVersion(selectedProtocol.versions[0]);
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

    console.log('selectedImageProperties', selectedImage?.properties);

    const propertiesWithoutKeyGroup: NodePropertyGroup[] =
      selectedImage?.properties
        .filter((property) => !property.keyGroup)
        .map((property) => ({
          key: property.key,
          uiType: property.uiType,
          value: property.defaultValue || '',
          properties: [property],
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
      });
    }

    const defaultFirewall = selectedImage?.firewall?.rules! ?? [];

    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      properties,
      defaultFirewall,
    }));
  }, [selectedImage]);

  useEffect(() => {
    (async () => {
      if (!selectedVersion) return;

      const imageResponse = await imageClient.getImage(
        selectedVersion?.versionKey!,
      );

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
    if (selectedVersion && selectedRegion && defaultOrganization)
      getPrice({
        region: selectedRegion?.name!,
        versionKey: selectedVersion.versionKey,
        orgId: defaultOrganization?.orgId,
      });
  }, [selectedProtocol, selectedVersion, selectedRegion]);

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
        });

        setVersions([...versionsResponse]);
      })();
    }
  }, [selectedVariant, selectedProtocol]);

  const handleHostsChanged = (hosts: NodeLauncherHost[] | null) => {
    Mixpanel.track('Launch Node - Host Changed');
    setSelectedHosts(hosts);
    setSelectedRegion(null);
  };

  const handleRegionChanged = (region: Region | null) => {
    Mixpanel.track('Launch Node - Region Changed');
    setSelectedRegion(region);
  };

  const handleRegionsLoaded = (region: Region | null) => {
    setSelectedRegion(region);
  };

  const handleProtocolSelected = (protocol: Protocol) => {
    setError(null);
    setIsLaunchError(false);
    setIsLaunching(false);
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

  const handleVersionChanged = (version: ProtocolVersion | null) => {
    Mixpanel.track('Launch Node - Version Changed');
    setSelectedVersion(version);
  };

  const handleVariantChanged = (variant: string) => setSelectedVariant(variant);

  const handleCreateNodeClicked = async () => {
    setIsLaunching(true);

    const isSingleNode =
      !selectedHosts ||
      (selectedHosts?.length === 1 && selectedHosts[0].nodesToLaunch === 1);

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.orgId,
      imageId: selectedImage?.imageId!,
      newValues: nodeLauncherState.properties?.map((property) => ({
        key: property.key,
        value: property.value,
      }))!,
      placement: {},
      addRules: nodeLauncherState.firewall,
    };

    console.log('createNodeParams', params);

    if (selectedHosts?.length!) {
      params.placement = {
        multiple: {
          nodeCounts: selectedHosts.map(
            ({ host: { hostId }, nodesToLaunch: nodeCount }) => ({
              hostId,
              nodeCount,
            }),
          ),
        },
      };
    } else {
      params.placement = {
        scheduler: {
          region: selectedRegion?.name!,
          resource: ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
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

  return {
    handleHostsChanged,
    handleRegionChanged,
    handleRegionsLoaded,
    handleProtocolSelected,
    handleNodePropertyChanged,
    handleNodeConfigPropertyChanged,
    handleVersionChanged,
    handleVariantChanged,
    handleCreateNodeClicked,
  };
};
