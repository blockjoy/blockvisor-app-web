import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { toast } from 'react-toastify';
import isEqual from 'lodash/isEqual';
import {
  Protocol,
  ProtocolVersion,
} from '@modules/grpc/library/blockjoy/v1/protocol';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
// import {
//   NodeType,
//   UiType,
// } from '@modules/grpc/library/blockjoy/common/v1/node';
import {
  // NodeProperty,
  // NodeScheduler_ResourceAffinity,
  NodeServiceCreateRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
// import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { hostAtoms, useHostSelect } from '@modules/host';
import {
  useNodeAdd,
  nodeLauncherAtoms,
  protocolAtoms,
  useGetRegions,
  sortNetworks,
  sortVersions,
  NodeLauncherHost,
  NodeLauncherState,
} from '@modules/node';
import { organizationSelectors } from '@modules/organization';
import { ROUTES, useNavigate } from '@shared/index';
import { Mixpanel } from '@shared/services/mixpanel';
import { authSelectors } from '@modules/auth';
import { usePricing } from '@modules/billing';
import { ResourceAffinity } from '@modules/grpc/library/blockjoy/common/v1/node';
import { imageClient } from '@modules/grpc';
import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';

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
    name: string,
    value: string | boolean,
  ) => void;
  handleVersionChanged: (version: ProtocolVersion | null) => void;
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
    let properties: ImageProperty[] | undefined;

    const propertyMap = (property: ImageProperty) => ({
      name: property.key,
      default: property.defaultValue,
    });

    const nodeLauncherProperties =
      nodeLauncherState.properties?.map(propertyMap);

    const selectedProperties = selectedImage?.properties.map(propertyMap);

    if (
      selectedProperties &&
      !isEqual(nodeLauncherProperties, selectedProperties)
    ) {
      const nodeTypePropertiesCopy = [...selectedImage?.properties!];

      properties = nodeTypePropertiesCopy.map((property) => ({
        ...property,
        value: property.defaultValue ?? '',
        disabled: false,
      }));
    } else {
      properties = nodeLauncherState.properties;
    }

    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      properties,
    }));
  }, [selectedVersion]);

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
    if (true)
      getPrice({
        region: selectedRegion?.name!,
        versionKey: { variantKey: '???', protocolKey: '???' },
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
    getHosts();
  }, [defaultOrganization?.orgId]);

  useEffect(() => {
    getRegions();
  }, [defaultOrganization?.orgId, selectedImage]);

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
    name: string,
    value: boolean | string,
  ) => {
    setError('');
    setIsLaunchError(false);
    if (!nodeLauncherState.properties) return;

    const propertiesCopy = [...nodeLauncherState.properties!];

    const propertyIndex = propertiesCopy.findIndex(
      (property) => property.key === name,
    );

    if (propertyIndex === -1) return;

    const updatedProperty = {
      ...propertiesCopy[propertyIndex],
      value: value?.toString(),
    };

    propertiesCopy[propertyIndex] = updatedProperty;

    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      properties: propertiesCopy,
    }));

    Mixpanel.track('Launch Node - Node Config Property Changed', {
      propertyName: updatedProperty.key,
      propertyValue: value?.toString(),
    });
  };

  const handleVersionChanged = (version: ProtocolVersion | null) => {
    Mixpanel.track('Launch Node - Version Changed');
    setSelectedVersion(version);
  };

  const handleCreateNodeClicked = async () => {
    setIsLaunching(true);

    const isSingleNode =
      !selectedHosts ||
      (selectedHosts?.length === 1 && selectedHosts[0].nodesToLaunch === 1);

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.orgId,
      addRules: [],
      imageId: '',
      newValues: [],
      placement: {},
    };

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
    handleCreateNodeClicked,
  };
};
