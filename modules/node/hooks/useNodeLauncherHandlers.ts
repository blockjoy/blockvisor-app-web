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

interface IUseNodeLauncherHandlersHook {
  handleHostChanged: (host: Host | null) => void;
  handleRegionChanged: (region: Region | null) => void;
  handleRegionsLoaded: (region: Region | null) => void;
  handleProtocolSelected: (
    blockchainId: string,
    nodeType: NodeType,
    // properties?: NodeProperty[],
  ) => void;
  handleNodePropertyChanged: (name: string, value: any) => void;
  handleNodeConfigPropertyChanged: (
    name: string,
    value: string | boolean,
  ) => void;
  handleVersionChanged: (version: BlockchainVersion | null) => void;
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
  const hostList = useRecoilValue(hostAtoms.hostList);
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
  const setIsLoading = useSetRecoilState(nodeLauncherAtoms.isLoading);
  const [selectedHost, setSelectedHost] = useRecoilState(
    nodeLauncherAtoms.selectedHost,
  );
  const [selectedVersion, setSelectedVersion] = useRecoilState(
    nodeLauncherAtoms.selectedVersion,
  );
  const [selectedRegion, setSelectedRegion] = useRecoilState(
    nodeLauncherAtoms.selectedRegion,
  );

  useEffect(() => {
    setSelectedHost(null);
  }, [hostList]);

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

  const handleProtocolSelected = (
    blockchainId: string,
    nodeType: NodeType,
    properties?: NodeProperty[],
  ) => {
    setError(null);
    setIsLoading(false);
    setNodeLauncherState({
      ...nodeLauncherState,
      blockchainId,
      nodeType,
      // properties,
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
    setIsLoading(true);

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.id,
      version: selectedVersion?.version!,
      nodeType: +nodeLauncherState.nodeType ?? 0,
      blockchainId: nodeLauncherState.blockchainId ?? '',
      properties: nodeLauncherState.properties!,
      network: nodeLauncherState.network!,
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

    const sortedVersions = sortVersions(activeNodeType.versions);

    setSelectedNodeType(sortNodeTypes(activeBlockchain.nodeTypes)[0]);

    // default to latest version
    setSelectedVersion(sortedVersions[sortedVersions.length - 1]);
  }, [nodeLauncherState.blockchainId, nodeLauncherState.nodeType]);

  useEffect(() => {
    let properties: NodeProperty[] | undefined, keyFiles;

    if (selectedVersion?.properties.length) {
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
    }

    setNodeLauncherState({
      ...nodeLauncherState,
      keyFiles,
      properties,
      network:
        // default to main network
        sortNetworks(selectedVersion?.networks)?.find(
          (network) => network.name.includes('main')!,
        )?.name || sortNetworks(selectedVersion?.networks)[0]?.name,
    });
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
    handleFileUploaded,
    handleCreateNodeClicked,
  };
};
