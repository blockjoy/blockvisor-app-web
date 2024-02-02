import { useEffect } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { useRouter } from 'next/router';
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
import { hostAtoms, useHostSelect } from '@modules/host';
import { useNodeAdd, nodeLauncherAtoms, blockchainAtoms } from '@modules/node';
import { organizationAtoms } from '@modules/organization';
import { ROUTES } from '@shared/index';
import { Mixpanel } from '@shared/services/mixpanel';
import { sortNetworks, sortNodeTypes, sortVersions } from '../utils';
import isEqual from 'lodash/isEqual';

interface IUseNodeLauncherHandlersHook {
  handleHostChanged: (host: Host | null) => void;
  handleRegionChanged: (region: Region | null) => void;
  handleRegionsLoaded: (region: Region | null) => void;
  handleProtocolSelected: (blockchainId: string, nodeType: NodeType) => void;
  handleNodePropertyChanged: (name: string, value: any) => void;
  handleNodeConfigPropertyChanged: (
    name: string,
    value: string | boolean,
  ) => void;
  handleVersionChanged: (version: BlockchainVersion | null) => void;
  handleNetworkChanged: (network: string) => void;
  handleFileUploaded: (e: any) => void;
  handleCreateNodeClicked: () => void;
}

export const useNodeLauncherHandlers = (): IUseNodeLauncherHandlersHook => {
  const router = useRouter();

  const { getHosts } = useHostSelect();
  const { createNode } = useNodeAdd();

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const allHosts = useRecoilValue(hostAtoms.allHosts);
  const blockchains = useRecoilValue(blockchainAtoms.blockchains);
  const setSelectedNodeType = useSetRecoilState(
    nodeLauncherAtoms.selectedNodeType,
  );
  const [nodeLauncherState, setNodeLauncherState] = useRecoilState(
    nodeLauncherAtoms.nodeLauncher,
  );
  const resetNodeLauncherState = useResetRecoilState(
    nodeLauncherAtoms.nodeLauncher,
  );
  const setError = useSetRecoilState(nodeLauncherAtoms.error);
  const setIsLaunching = useSetRecoilState(nodeLauncherAtoms.isLaunching);

  const [selectedHost, setSelectedHost] = useRecoilState(
    nodeLauncherAtoms.selectedHost,
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
    let queriedHost = null;
    if (router.isReady && router.query.hostId)
      queriedHost =
        allHosts.find((host: Host) => host.id === router.query.hostId) ?? null;

    setSelectedHost(queriedHost);
  }, [allHosts, router.isReady]);

  const handleHostChanged = (host: Host | null) => {
    Mixpanel.track('Launch Node - Host Changed');
    setSelectedHost(host);
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
    setIsLaunching(false);

    setNodeLauncherState({
      ...nodeLauncherState,
      blockchainId,
      nodeType,
    });

    Mixpanel.track('Launch Node - Protocol Selected', {
      blockchain: blockchains?.find((b) => b.id === blockchainId)?.name,
      nodeType: NodeType[nodeType],
    });
  };

  const handleNodePropertyChanged = (name: string, value: any) => {
    setNodeLauncherState({
      ...nodeLauncherState,
      [name]: value,
    });

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

    setNodeLauncherState({
      ...nodeLauncherState,
      properties: propertiesCopy,
    });

    Mixpanel.track('Launch Node - Node Config Property Changed', {
      propertyName: updatedProperty.name,
      propertyValue: value?.toString(),
    });
  };

  const handleVersionChanged = (version: BlockchainVersion | null) => {
    Mixpanel.track('Launch Node - Version Changed');
    setSelectedVersion(version);
  };

  const handleNetworkChanged = (network: string) => setSelectedNetwork(network);

  const handleFileUploaded = (e: any) => {
    setError(null);
    const keyFilesCopy = [...nodeLauncherState.keyFiles!];

    let foundNodeFiles = keyFilesCopy.find(
      (files) => files.name === e.target.name,
    );

    if (!foundNodeFiles) return;

    for (let file of e?.target?.files) {
      foundNodeFiles?.files.push(file);
    }

    setNodeLauncherState({
      ...nodeLauncherState,
      keyFiles: keyFilesCopy,
    });

    Mixpanel.track('Launch Node - Key File Uploaded');
  };

  const handleCreateNodeClicked = () => {
    setIsLaunching(true);

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.id,
      version: selectedVersion?.version!,
      nodeType: +nodeLauncherState.nodeType ?? 0,
      blockchainId: nodeLauncherState.blockchainId ?? '',
      properties: nodeLauncherState.properties!,
      network: selectedNetwork!,
      allowIps: nodeLauncherState.allowIps,
      denyIps: nodeLauncherState.denyIps,
      placement: selectedHost
        ? { hostId: selectedHost.id }
        : {
            scheduler: {
              region: selectedRegion?.name!,
              resource:
                NodeScheduler_ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
            },
          },
    };

    createNode(
      params,
      (nodeId: string) => {
        Mixpanel.track('Launch Node - Node Launched');
        router.push(ROUTES.NODE(nodeId));
        resetNodeLauncherState();
        resetSelectedVersion();
        resetSelectedNetwork();
      },
      (error: string) => setError(error!),
    );
  };

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

    setSelectedNodeType(sortNodeTypes(activeBlockchain.nodeTypes)[0]);

    const selectedVersionExists = activeNodeType.versions.some(
      (version) => version.id === selectedVersion?.id,
    );

    if (!selectedVersionExists) {
      const sortedVersions = sortVersions(activeNodeType.versions);
      setSelectedVersion(sortedVersions[0]);
    }
  }, [nodeLauncherState.blockchainId, nodeLauncherState.nodeType]);

  useEffect(() => {
    let properties: NodeProperty[] | undefined, keyFiles;

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

    setNodeLauncherState({
      ...nodeLauncherState,
      keyFiles,
      properties,
    });

    const selectedNetworkExists = selectedVersion?.networks
      .map((network) => network.name)
      .some((network) => network === selectedNetwork);

    if (!selectedNetworkExists)
      setSelectedNetwork(
        sortNetworks(selectedVersion?.networks)?.find(
          (network) => network.name.includes('main')!,
        )?.name || sortNetworks(selectedVersion?.networks)[0]?.name,
      );
  }, [selectedVersion?.id]);

  useEffect(() => {
    Mixpanel.track('Launch Node - Opened');
  }, []);

  useEffect(() => {
    getHosts();
  }, [defaultOrganization?.id]);

  return {
    handleHostChanged,
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
