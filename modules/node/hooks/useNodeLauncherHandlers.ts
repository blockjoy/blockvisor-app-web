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
  NodePlacement,
  NodeProperty,
  NodeScheduler_ResourceAffinity,
  NodeServiceCreateRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
import { hostAtoms, useHostSelect } from '@modules/host';
import {
  useNodeAdd,
  nodeLauncherAtoms,
  blockchainAtoms,
  nodeAtoms,
  nodeLauncherSelectors,
  useGetRegions,
  sortNetworks,
  sortVersions,
  NodeLauncherHost,
} from '@modules/node';
import { organizationAtoms } from '@modules/organization';
import { ROUTES, useNavigate } from '@shared/index';
import { Mixpanel } from '@shared/services/mixpanel';
import { matchSKU } from '@modules/billing';
import { delay } from '@shared/utils/delay';

type IUseNodeLauncherHandlersParams = {
  fulfilReqs: boolean;
};

interface IUseNodeLauncherHandlersHook {
  handleHostsChanged: (hosts: NodeLauncherHost[] | null) => void;
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
  handleQuantityChanged: (quantity: number | null) => void;
}

export const useNodeLauncherHandlers = ({
  fulfilReqs,
}: IUseNodeLauncherHandlersParams): IUseNodeLauncherHandlersHook => {
  const searchParams = useSearchParams();
  const { navigate } = useNavigate();

  const { getHosts } = useHostSelect();
  const { createNode } = useNodeAdd();
  useGetRegions();

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
  const selectedBlockchain = useRecoilValue(
    nodeLauncherSelectors.selectedBlockchain(nodeLauncherState.blockchainId),
  );
  const setError = useSetRecoilState(nodeLauncherAtoms.error);
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
  const selectedRegionByHost = useRecoilValue(
    nodeLauncherSelectors.selectedRegionByHost(
      selectedHosts?.length ? selectedHosts[0].host?.region : '',
    ),
  );
  const resetSelectedNetwork = useResetRecoilState(
    nodeLauncherAtoms.selectedNetwork,
  );
  const [selectedNetwork, setSelectedNetwork] = useRecoilState(
    nodeLauncherAtoms.selectedNetwork,
  );
  const setSelectedSKU = useSetRecoilState(nodeAtoms.selectedSKU);

  useEffect(() => {
    setSelectedHosts(null);
  }, [allHosts]);

  useEffect(() => {
    let queriedHost = null;
    const hostId = searchParams.get('hostId');

    if (hostId) {
      queriedHost = allHosts.find((host: Host) => host.id === hostId) ?? null;
      setSelectedHosts([
        {
          nodesToLaunch: 1,
          host: queriedHost!,
        },
      ]);
    }
  }, [allHosts]);

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

  const handleQuantityChanged = (quantity: number | null) =>
    setNodeLauncherState({
      ...nodeLauncherState,
      quantity,
    });

  const launchNode = async (
    placement: NodePlacement,
    launchDelay: number,
    nodesLaunched: number,
    onSuccess: (nodeId: string) => void,
  ) => {
    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.id,
      version: selectedVersion?.version!,
      nodeType: +nodeLauncherState.nodeType ?? 0,
      blockchainId: nodeLauncherState.blockchainId ?? '',
      properties: nodeLauncherState.properties!,
      network: selectedNetwork!,
      allowIps: nodeLauncherState.allowIps,
      denyIps: nodeLauncherState.denyIps,
      placement,
    };

    await delay(launchDelay);

    await createNode(
      params,
      (nodeId: string) => {
        Mixpanel.track('Launch Node - Node Launched');
        nodesLaunched++;
        if (nodeLauncherState.quantity! > 1) {
          if (nodesLaunched === nodeLauncherState.quantity) {
            toast.success('All nodes launched');
            onSuccess(nodeId);
          }
        } else {
          onSuccess(nodeId);
        }
      },
      (error: string) => setError(error!),
    );
  };

  const handleCreateNodeClicked = async () => {
    setIsLaunching(true);
    let nodesLaunched = 0;

    if (selectedHosts?.length! > 1) {
      for (let nodeLauncherHost of selectedHosts!) {
        for (let i = 0; i < nodeLauncherHost.nodesToLaunch; i++) {
          await launchNode(
            { hostId: nodeLauncherHost.host.id },
            3000,
            nodesLaunched,
            () => {
              navigate(ROUTES.NODES, () => {
                resetNodeLauncherState();
                resetSelectedVersion();
                resetSelectedNetwork();
              });
            },
          );
        }
      }
    } else {
      const placement = selectedHosts
        ? { hostId: selectedHosts[0].host.id }
        : {
            scheduler: {
              region: selectedRegion?.name!,
              resource:
                NodeScheduler_ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
            },
          };

      for (let i = 0; i < nodeLauncherState.quantity!; i++) {
        if (nodeLauncherState.quantity! > 1) {
          await launchNode(placement, 3000, nodesLaunched, () => {
            navigate(ROUTES.NODES, () => {
              resetNodeLauncherState();
              resetSelectedVersion();
              resetSelectedNetwork();
            });
          });
        } else {
          launchNode(placement, 0, nodesLaunched, (nodeId: string) => {
            navigate(ROUTES.NODE(nodeId), () => {
              resetNodeLauncherState();
              resetSelectedVersion();
              resetSelectedNetwork();
            });
          });
        }
      }
    }
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
    const nodeSKU = matchSKU('node', {
      blockchain: selectedBlockchain,
      nodeLauncher: nodeLauncherState,
      version: selectedVersion,
      region: !!selectedHosts ? selectedRegionByHost : selectedRegion,
      network: selectedNetwork,
    });
    setSelectedSKU(nodeSKU);
  }, [
    nodeLauncherState.nodeType,
    selectedVersion,
    selectedRegion,
    selectedNetwork,
    selectedHosts,
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
    handleQuantityChanged,
  };
};
