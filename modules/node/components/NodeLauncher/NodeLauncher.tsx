import { styles } from './NodeLauncher.styles';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { NodeLauncherConfig } from './Config/NodeLauncherConfig';
import { NodeLauncherProtocol } from './Protocol/NodeLauncherProtocol';
import { NodeLauncherSummary } from './Summary/NodeLauncherSummary';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';
import { useRouter } from 'next/router';
import { EmptyColumn, PageTitle, sort } from '@shared/components';
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
import { BlockchainNodeType } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { Mixpanel } from '@shared/services/mixpanel';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import {
  useHasPermissions,
  Permissions,
} from '@modules/auth/hooks/useHasPermissions';
import { authSelectors } from '@modules/auth';
import { onlyUnique } from '@shared/utils/onlyUnique';

export type NodeLauncherState = {
  blockchainId: string;
  nodeTypeVersion: string;
  nodeType: NodeType;
  properties: NodeProperty[];
  keyFiles?: NodeFiles[];
  network: string;
  allowIps: FilteredIpAddr[];
  denyIps: FilteredIpAddr[];
  placement: NodePlacement;
  region: string;
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

  const [hasRegionListError, setHasRegionListError] = useState(true);
  const [serverError, setServerError] = useState<string>();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [networkList, setNetworkList] = useState<string[]>([]);
  const [versionList, setVersionList] = useState<string[]>([]);
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);

  const { defaultOrganization } = useDefaultOrganization();

  const [node, setNode] = useState<NodeLauncherState>({
    blockchainId: '',
    nodeType: NodeType.NODE_TYPE_UNSPECIFIED,
    properties: [],
    nodeTypeVersion: '',
    network: '',
    allowIps: [],
    denyIps: [],
    placement: {},
    region: '',
  });

  const isNodeValid = Boolean(
    node.blockchainId && node.nodeType && node.region,
  );

  const isConfigValid = !node.keyFiles
    ? null
    : Boolean(
        node.keyFiles?.every((f) => f.files?.length) &&
          node.properties
            ?.filter(
              (type: NodeProperty) =>
                type.required && type.uiType !== UiType.UI_TYPE_FILE_UPLOAD,
            )
            .every(
              (type) => type.value || type.uiType === UiType.UI_TYPE_SWITCH,
            ),
      );

  const handleProtocolSelected = (
    blockchainId: string,
    nodeType: NodeType,
    properties: NodeProperty[],
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

  // hack that needs removing
  const hasAddedFiles = () => {
    const activeNodeFiles = node.keyFiles?.find((f, i) => i === 0);

    if (!activeNodeFiles) return true;

    return !!activeNodeFiles?.files?.length;
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

    const propertiesCopy = [...node.properties];

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

  const handleHostChanged = (host: Host | null) => {
    Mixpanel.track('Launch Node - Host Changed');
    setSelectedHost(host);
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
    setNode({
      ...node,
      region,
    });
  };

  const handleCreateNodeClicked = () => {
    setIsCreating(true);

    const mergedFiles: File[] = [];

    // build merged file array
    for (let f of node.keyFiles!) {
      for (let nf of f.files) {
        mergedFiles.push(nf);
      }
    }

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.id,
      version: node.nodeTypeVersion,
      nodeType: +node.nodeType ?? 0,
      blockchainId: node.blockchainId ?? '',
      properties: node.properties,
      network: node.network,
      allowIps: node.allowIps,
      denyIps: node.denyIps,
      placement: selectedHost
        ? { hostId: selectedHost.id }
        : {
            scheduler: {
              region: node.region,
              resource:
                NodeScheduler_ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
            },
          },
    };

    createNode(
      params,
      mergedFiles.flat(),
      (nodeId: string) => {
        Mixpanel.track('Launch Node - Node Launched');
        router.push(ROUTES.NODE(nodeId));
      },
      (error: string) => setServerError(error!),
    );
  };

  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canAddNode: boolean = useHasPermissions(
    userRole,
    userRoleInOrganization,
    Permissions.CREATE_NODE,
  );

  useEffect(() => {
    const activeBlockchain = blockchains.find(
      (b) => b.id === node.blockchainId,
    );

    if (!activeBlockchain) return;

    const activeNodeType = activeBlockchain.nodeTypes.find(
      (type: BlockchainNodeType) => type.nodeType === +node.nodeType,
    );

    const sortedVersionList = sort(
      activeNodeType?.versions.map((n) => n.version).filter(onlyUnique) || [],
      { order: 'asc' },
    );

    if (sortedVersionList.length) {
      console.log('sortedVersionList', sortedVersionList);
    }

    const activeVersion = activeNodeType?.versions[0];

    setVersionList(sortedVersionList);

    const sortedNetworkList = sort(
      activeVersion?.networks.map((n) => n.name) || [],
      { order: 'asc' },
    );

    setNetworkList(sortedNetworkList);

    const nodeTypePropertiesCopy = [...(activeVersion?.properties! || [])];

    const propertiesWithValue: NodeProperty[] = nodeTypePropertiesCopy.map(
      (property) => ({
        name: property.name,
        displayName: property.name,
        disabled: false,
        uiType: property.uiType,
        required: property.required,
        value: property.default ?? '',
      }),
    );

    const fileProperties: NodeFiles[] = propertiesWithValue
      .filter((p) => p.uiType === UiType.UI_TYPE_FILE_UPLOAD)
      .map((p) => ({
        name: p.name,
        files: [],
      }));

    setNode({
      ...node,
      properties: propertiesWithValue,
      keyFiles: fileProperties,
      network: sortedNetworkList.length ? sortedNetworkList[0] : '',
      nodeTypeVersion: activeBlockchain.nodeTypes.length
        ? sortedVersionList[0]
        : '',
    });
  }, [node.blockchainId, node.nodeType]);

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
        {Boolean(
          node.blockchainId && node.nodeType && node.properties?.length,
        ) && (
          <NodeLauncherConfig
            isConfigValid={isConfigValid}
            onFileUploaded={handleFileUploaded}
            onNodeConfigPropertyChanged={handleNodeConfigPropertyChanged}
            onNodePropertyChanged={handleNodePropertyChanged}
            networkList={networkList}
            versionList={versionList}
            nodeLauncherState={node}
          />
        )}
        {!node.blockchainId && !node.nodeType && (
          <div css={styles.empty}>
            <EmptyColumn
              title="Launch a Node."
              description="Select a protocol to get started."
            />
          </div>
        )}
        {Boolean(
          node.blockchainId && node.nodeType && node?.properties?.length,
        ) && (
          <NodeLauncherSummary
            hasNetworkList={Boolean(networkList?.length)}
            serverError={serverError!}
            hasAddedFiles={hasAddedFiles()}
            isCreating={isCreating}
            isNodeValid={isNodeValid}
            isConfigValid={isConfigValid}
            nodeLauncherState={node}
            selectedHost={selectedHost}
            canAddNode={canAddNode}
            onHostChanged={handleHostChanged}
            onNodePropertyChanged={handleNodePropertyChanged}
            onCreateNodeClicked={handleCreateNodeClicked}
            onRegionsLoaded={handleRegionsLoaded}
          />
        )}
      </div>
    </>
  );
};
