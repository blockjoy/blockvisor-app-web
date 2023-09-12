import { styles } from './NodeLauncher.styles';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { NodeLauncherConfig } from './Config/NodeLauncherConfig';
import { NodeLauncherProtocol } from './Protocol/NodeLauncherProtocol';
import { NodeLauncherSummary } from './Summary/NodeLauncherSummary';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';
import { useRouter } from 'next/router';
import { EmptyColumn, PageTitle } from '@shared/components';
import {
  organizationSelectors,
  useDefaultOrganization,
} from '@modules/organization';
import { wrapper } from 'styles/wrapper.styles';
import { ROUTES } from '@shared/constants/routes';
import {
  UiType,
  NodeProperty,
  NodeType,
  NodeServiceCreateRequest,
  FilteredIpAddr,
  NodePlacement,
  NodeScheduler_ResourceAffinity,
} from '@modules/grpc/library/blockjoy/v1/node';
import {
  BlockchainNodeType,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  sortVersions,
  sortNetworks,
  sortNodeTypes,
} from '@modules/node/utils/sortLists';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { Mixpanel } from '@shared/services/mixpanel';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import {
  useHasPermissions,
  Permissions,
} from '@modules/auth/hooks/useHasPermissions';
import { authSelectors } from '@modules/auth';
import { useHostList } from '@modules/host';

export type NodeLauncherState = {
  blockchainId: string;
  nodeTypeVersion: string;
  nodeType: NodeType;
  properties?: NodeProperty[];
  keyFiles?: NodeFiles[];
  network?: string;
  allowIps: FilteredIpAddr[];
  denyIps: FilteredIpAddr[];
  placement: NodePlacement;
};

export type CreateNodeParams = {
  version: string;
  nodeType: number;
  blockchain: string;
  nodeTypeProperties: NodeProperty[];
  key_files?: File[];
  network: string;
  allowedIps: FilteredIpAddr[];
  deniedIps: FilteredIpAddr[];
};

export const NodeLauncher = () => {
  const router = useRouter();

  const { blockchains } = useGetBlockchains();
  const { createNode } = useNodeAdd();
  const { hostList } = useHostList();

  const [, setHasRegionListError] = useState(true);
  const [serverError, setServerError] = useState<string>();
  const [isCreating, setIsCreating] = useState(false);

  const [selectedNodeType, setSelectedNodeType] =
    useState<BlockchainNodeType>();
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<BlockchainVersion>();
  const [selectedRegion, setSelectedRegion] = useState<string>();

  const { defaultOrganization } = useDefaultOrganization();

  const [node, setNode] = useState<NodeLauncherState>({
    blockchainId: '',
    nodeType: NodeType.NODE_TYPE_UNSPECIFIED,
    nodeTypeVersion: '',
    allowIps: [],
    denyIps: [],
    placement: {},
  });

  const isNodeValid = Boolean(
    node.blockchainId && node.nodeType && (selectedHost || selectedRegion),
  );

  const isConfigValid =
    Boolean(node.network) &&
    (!node.properties?.length ||
      Boolean(
        node.properties
          ?.filter(
            (type: NodeProperty) =>
              type.required &&
              type.uiType !== UiType.UI_TYPE_FILE_UPLOAD &&
              type.uiType !== UiType.UI_TYPE_SWITCH,
          )
          .every((type) => type.value),
      ));

  const handleProtocolSelected = (
    blockchainId: string,
    nodeType: NodeType,
    properties?: NodeProperty[],
  ) => {
    setServerError(undefined);
    setIsCreating(false);
    setNode({
      ...node,
      blockchainId,
      nodeType,
      properties,
    });
    Mixpanel.track('Launch Node - Protocol Selected', {
      blockchain: blockchains?.find((b) => b.id === blockchainId)?.name,
      nodeType: NodeType[nodeType],
    });
  };

  const handleNodePropertyChanged = (name: string, value: any) => {
    setNode({
      ...node,
      [name]: value,
    });

    Mixpanel.track('Launch Node - Property Changed', {
      propertyName: name,
      propertyValue: value,
    });
  };

  const handleNodeConfigPropertyChanged = (e: any) => {
    setServerError('');

    const propertiesCopy = [...node.properties!];

    let foundProperty = propertiesCopy.find(
      (property) => property.name === e.target.name,
    );

    if (!foundProperty) return;

    const newValue =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    foundProperty.value = newValue;

    setNode({
      ...node,
      properties: propertiesCopy,
    });

    Mixpanel.track('Launch Node - Node Config Property Changed', {
      propertyName: foundProperty.name,
      propertyValue: newValue,
    });
  };

  const handleVersionChanged = (version: BlockchainVersion) => {
    Mixpanel.track('Launch Node - Version Changed');
    setSelectedVersion(version);
  };

  const handleHostChanged = (host: Host | null) => {
    Mixpanel.track('Launch Node - Host Changed');
    setSelectedHost(host);
    setSelectedRegion(undefined);
  };

  const handleRegionChanged = (region: string) => {
    Mixpanel.track('Launch Node - Region Changed');
    setSelectedRegion(region);
  };

  const handleFileUploaded = (e: any) => {
    setServerError(undefined);
    const keyFilesCopy = [...node.keyFiles!];

    let foundNodeFiles = keyFilesCopy.find(
      (files) => files.name === e.target.name,
    );

    if (!foundNodeFiles) return;

    for (let file of e?.target?.files) {
      foundNodeFiles?.files.push(file);
    }

    setNode({
      ...node,
      keyFiles: keyFilesCopy,
    });

    Mixpanel.track('Launch Node - Key File Uploaded');
  };

  const handleRegionsLoaded = (region: string) => {
    setHasRegionListError(Boolean(region));
    setSelectedRegion(region);
  };

  const handleCreateNodeClicked = () => {
    setIsCreating(true);

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.id,
      version: selectedVersion?.version!,
      nodeType: +node.nodeType ?? 0,
      blockchainId: node.blockchainId ?? '',
      properties: node.properties!,
      network: node.network!,
      allowIps: node.allowIps,
      denyIps: node.denyIps,
      placement: selectedHost
        ? { hostId: selectedHost.id }
        : {
            scheduler: {
              region: selectedRegion!,
              resource:
                NodeScheduler_ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
            },
          },
    };

    createNode(
      params,
      (nodeId: string) => {
        Mixpanel.track('Launch Node - Node Launched');
        router.push(ROUTES.NODES);
      },
      (error: string) => setServerError(error!),
    );
  };

  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canAddNode: boolean = useHasPermissions();

  useEffect(() => {
    const activeBlockchain = blockchains.find(
      (b) => b.id === node.blockchainId,
    );

    if (!activeBlockchain) return;

    const activeNodeType =
      activeBlockchain.nodeTypes.find((nt) => nt.nodeType === node.nodeType) ||
      activeBlockchain.nodeTypes[0];

    if (!activeNodeType) return;

    const sortedVersions = sortVersions(activeNodeType.versions);

    setSelectedNodeType(sortNodeTypes(activeBlockchain.nodeTypes)[0]);
    setSelectedVersion(sortedVersions[0]);
  }, [node.blockchainId, node.nodeType]);

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

    setNode({
      ...node,
      keyFiles,
      properties,
      network: sortNetworks(selectedVersion?.networks)[0]?.name,
    });
  }, [selectedVersion?.id]);

  useEffect(() => {
    setSelectedHost(null);
  }, [hostList]);

  useEffect(() => {
    Mixpanel.track('Launch Node - Opened');
  }, []);

  return (
    <>
      <PageTitle title="Launch Node" icon={<IconRocket />} />
      <div css={[styles.wrapper, wrapper.main]}>
        <NodeLauncherProtocol
          onProtocolSelected={handleProtocolSelected}
          blockchainId={node.blockchainId}
          nodeType={node.nodeType}
        />
        {Boolean(node.blockchainId && node.nodeType) && (
          <NodeLauncherConfig
            onFileUploaded={handleFileUploaded}
            onNodeConfigPropertyChanged={handleNodeConfigPropertyChanged}
            onNodePropertyChanged={handleNodePropertyChanged}
            onVersionChanged={handleVersionChanged}
            selectedVersion={selectedVersion}
            networks={sortNetworks(selectedVersion?.networks)}
            versions={sortVersions(selectedNodeType?.versions)}
            nodeLauncherState={node}
          />
        )}
        {Boolean(!node.blockchainId && !node.nodeType) && (
          <div css={styles.empty}>
            <EmptyColumn
              title="Launch a Node."
              description="Select a protocol to get started."
            />
          </div>
        )}
        {Boolean(node.blockchainId && node.nodeType && selectedVersion?.id) && (
          <NodeLauncherSummary
            hasNetworkList={Boolean(selectedVersion?.networks?.length)}
            serverError={serverError!}
            isCreating={isCreating}
            isNodeValid={isNodeValid}
            isConfigValid={isConfigValid}
            nodeLauncherState={node}
            selectedRegion={selectedRegion!}
            selectedVersion={selectedVersion!}
            selectedHost={selectedHost}
            canAddNode={canAddNode}
            onHostChanged={handleHostChanged}
            onRegionChanged={handleRegionChanged}
            onCreateNodeClicked={handleCreateNodeClicked}
            onRegionsLoaded={handleRegionsLoaded}
          />
        )}
      </div>
    </>
  );
};
