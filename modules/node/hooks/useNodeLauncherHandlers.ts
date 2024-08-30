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
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import {
  NodeType,
  UiType,
} from '@modules/grpc/library/blockjoy/common/v1/node';
import {
  NodeProperty,
  NodeScheduler_ResourceAffinity,
  NodeServiceCreateRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { hostAtoms, useHostSelect } from '@modules/host';
import {
  useNodeAdd,
  nodeLauncherAtoms,
  blockchainAtoms,
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

type IUseNodeLauncherHandlersParams = {
  fulfilReqs: boolean;
};

interface IUseNodeLauncherHandlersHook {
  handleHostsChanged: (hosts: NodeLauncherHost[] | null) => void;
  handleRegionChanged: (region: Region | null) => void;
  handleRegionsLoaded: (region: Region | null) => void;
  handleProtocolSelected: (blockchainId: string, nodeType: NodeType) => void;
  handleNodePropertyChanged: <K extends keyof NodeLauncherState>(
    name: K,
    value: NodeLauncherState[K],
  ) => void;
  handleNodeConfigPropertyChanged: (
    name: string,
    value: string | boolean,
  ) => void;
  handleVersionChanged: (version: BlockchainVersion | null) => void;
  handleNetworkChanged: (network: NetworkConfig) => void;
  handleFileUploaded: (e: any) => void;
  handleCreateNodeClicked: () => void;
}

export const useNodeLauncherHandlers = ({
  fulfilReqs,
}: IUseNodeLauncherHandlersParams): IUseNodeLauncherHandlersHook => {
  const searchParams = useSearchParams();
  const { navigate } = useNavigate();

  const { getHosts } = useHostSelect();
  const { createNode } = useNodeAdd();
  useGetRegions();
  const { getPrice } = usePricing();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const allHosts = useRecoilValue(hostAtoms.allHosts);
  const blockchains = useRecoilValue(blockchainAtoms.blockchains);
  const [selectedNodeType, setSelectedNodeType] = useRecoilState(
    nodeLauncherAtoms.selectedNodeType,
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
  const resetSelectedNetwork = useResetRecoilState(
    nodeLauncherAtoms.selectedNetwork,
  );
  const [selectedNetwork, setSelectedNetwork] = useRecoilState(
    nodeLauncherAtoms.selectedNetwork,
  );

  useEffect(() => {
    setSelectedHosts(null);
  }, [allHosts]);

  useEffect(() => {
    let queriedHost = null;
    const hostId = searchParams.get('hostId');

    if (hostId) {
      queriedHost = allHosts.find((host: Host) => host.id === hostId) ?? null;

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
    if (!isSuperUser || !blockchains.length) return;

    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      blockchainId: blockchains[0]?.id,
      nodeType: blockchains[0]?.nodeTypes[0].nodeType,
    }));
  }, [isSuperUser, blockchains]);

  useEffect(() => {
    if (!selectedNodeType) return;

    handleNodePropertyChanged('nodeType', selectedNodeType.nodeType);
  }, [selectedNodeType]);

  useEffect(() => {
    const activeBlockchain = blockchains.find(
      (b) => b.id === nodeLauncherState.blockchainId,
    );

    if (!activeBlockchain) return;

    const activeNodeType =
      activeBlockchain.nodeTypes.find(
        (nt) => nt.nodeType === nodeLauncherState.nodeType,
      ) || activeBlockchain.nodeTypes[0];

    if (!activeNodeType) return;

    setSelectedNodeType(activeNodeType);

    const selectedVersionExists = activeNodeType.versions.some(
      (version) => version.id === selectedVersion?.id,
    );

    if (!selectedVersionExists) {
      const sortedVersions = sortVersions(activeNodeType.versions);
      setSelectedVersion(sortedVersions[0]);
    }
  }, [nodeLauncherState.blockchainId, nodeLauncherState.nodeType]);

  useEffect(() => {
    let properties: NodeProperty[] | undefined, keyFiles: any;

    const propertyMap = (property: any) => ({
      name: property.name,
      default: property.default,
    });

    const nodeLauncherProperties =
      nodeLauncherState.properties?.map(propertyMap);

    const selectedVersionProperties =
      selectedVersion?.properties.map(propertyMap);

    if (
      selectedVersionProperties &&
      !isEqual(nodeLauncherProperties, selectedVersionProperties)
    ) {
      const nodeTypePropertiesCopy = [...selectedVersion?.properties!];

      properties = nodeTypePropertiesCopy.map((property) => ({
        ...property,
        value: property.default ?? '',
        disabled: false,
      }));

      keyFiles = properties
        .filter((p) => p.uiType === UiType.UI_TYPE_FILE_UPLOAD)
        .map((p) => ({
          name: p.name,
          files: [],
        }));
    } else {
      properties = nodeLauncherState.properties;
    }

    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      keyFiles,
      properties,
    }));

    const selectedNetworkExists = selectedVersion?.networks
      .map((network) => network.name)
      .some((network) => network === selectedNetwork?.name);

    if (!selectedNetworkExists)
      setSelectedNetwork(
        sortNetworks(selectedVersion?.networks)?.find(
          (network) => network.name.includes('main')!,
        ) || sortNetworks(selectedVersion?.networks)[0],
      );
  }, [selectedVersion?.id]);

  useEffect(() => {
    const activeBlockchain = blockchains.find(
      (b) => b.id === nodeLauncherState.blockchainId,
    );

    const isVersionUpdated = activeBlockchain?.nodeTypes.some((nt) =>
      nt.versions?.some((v) => v.id === selectedVersion?.id),
    );

    if (isVersionUpdated)
      getPrice({
        blockchainId: nodeLauncherState.blockchainId,
        version: selectedVersion?.version!,
        nodeType: nodeLauncherState.nodeType,
        network: selectedNetwork?.name!,
        region: selectedHosts?.[0].host?.region ?? selectedRegion?.name!,
      });
  }, [
    nodeLauncherState.blockchainId,
    selectedVersion?.version,
    nodeLauncherState.nodeType,
    selectedNetwork,
    selectedRegion?.name,
  ]);

  useEffect(() => {
    if (fulfilReqs) handleCreateNodeClicked();
  }, [fulfilReqs]);

  useEffect(() => {
    Mixpanel.track('Launch Node - Opened');
  }, []);

  useEffect(() => {
    getHosts();
  }, [defaultOrganization?.id]);

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

  const handleProtocolSelected = (blockchainId: string, nodeType: NodeType) => {
    setError(null);
    setIsLaunchError(false);
    setIsLaunching(false);

    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      blockchainId,
      nodeType,
    }));

    Mixpanel.track('Launch Node - Protocol Selected', {
      blockchain: blockchains?.find((b) => b.id === blockchainId)?.name,
      nodeType: NodeType[nodeType],
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
      (property) => property.name === name,
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
      propertyName: updatedProperty.name,
      propertyValue: value?.toString(),
    });
  };

  const handleVersionChanged = (version: BlockchainVersion | null) => {
    Mixpanel.track('Launch Node - Version Changed');
    setSelectedVersion(version);
  };

  const handleNetworkChanged = (network: NetworkConfig) =>
    setSelectedNetwork(network);

  const handleFileUploaded = (e: any) => {
    setError(null);
    setIsLaunchError(false);
    const keyFilesCopy = [...nodeLauncherState.keyFiles!];

    let foundNodeFiles = keyFilesCopy.find(
      (files) => files.name === e.target.name,
    );

    if (!foundNodeFiles) return;

    for (let file of e?.target?.files) {
      foundNodeFiles?.files.push(file);
    }

    setNodeLauncherState((nodeLauncherOldState) => ({
      ...nodeLauncherOldState,
      keyFiles: keyFilesCopy,
    }));

    Mixpanel.track('Launch Node - Key File Uploaded');
  };

  const handleCreateNodeClicked = async () => {
    setIsLaunching(true);

    const isSingleNode =
      !selectedHosts ||
      (selectedHosts?.length === 1 && selectedHosts[0].nodesToLaunch === 1);

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.id,
      version: selectedVersion?.version!,
      nodeType: +nodeLauncherState.nodeType ?? 0,
      blockchainId: nodeLauncherState.blockchainId ?? '',
      properties: nodeLauncherState.properties!,
      network: selectedNetwork?.name!,
      allowIps: nodeLauncherState.allowIps,
      denyIps: nodeLauncherState.denyIps,
      placement: {},
    };

    if (selectedHosts?.length!) {
      params.placement = {
        multiple: {
          nodeCounts: selectedHosts.map(
            ({ host: { id: hostId }, nodesToLaunch: nodeCount }) => ({
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
          resource:
            NodeScheduler_ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
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
          resetSelectedNetwork();
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
    handleNetworkChanged,
    handleFileUploaded,
    handleCreateNodeClicked,
  };
};
