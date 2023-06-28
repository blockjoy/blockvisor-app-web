import { styles } from './NodeLauncher.styles';
import { useEffect, useRef, useState } from 'react';
import { NodeLauncherConfig } from './Config/NodeLauncherConfig';
import { NodeLauncherProtocol } from './Protocol/NodeLauncherProtocol';
import { NodeLauncherSummary } from './Summary/NodeLauncherSummary';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';
import { useRouter } from 'next/router';
import { EmptyColumn, PageTitle } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '@modules/organization';
import { wrapper } from 'styles/wrapper.styles';
import { ROUTES } from '@shared/index';
import {
  UiType,
  NodeProperty,
  NodeType,
  NodeServiceCreateRequest,
  FilteredIpAddr,
  NodePlacement,
  NodeScheduler_ResourceAffinity,
} from '@modules/grpc/library/blockjoy/v1/node';
import { SupportedNodeType } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import IconRocket from '@public/assets/icons/app/Rocket.svg';

export type NodeLauncherState = {
  blockchainId: string;
  nodeVersion: string;
  nodeType: NodeType;
  properties: NodeProperty[];
  keyFiles?: NodeFiles[];
  network: string;
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
  const { blockchains } = useGetBlockchains();
  const { createNode } = useNodeAdd();
  const router = useRouter();

  const [serverError, setServerError] = useState<string>();

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [networkList, setNetworkList] = useState<string[]>([]);

  const [selectedHost, setSelectedHost] = useState<Host | null>(null);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const currentOrganization = useRef(defaultOrganization);

  const [node, setNode] = useState<NodeLauncherState>({
    blockchainId: '',
    nodeType: NodeType.NODE_TYPE_UNSPECIFIED,
    properties: [],
    nodeVersion: '',
    network: '',
    allowIps: [],
    denyIps: [],
    placement: {},
  });

  const handleProtocolSelected = (
    blockchainId: string,
    nodeType: NodeType,
    properties: NodeProperty[],
    nodeVersion: string,
  ) => {
    setServerError(undefined);
    setIsCreating(false);
    setNode({
      ...node,
      blockchainId,
      nodeType,
      properties,
      nodeVersion,
    });
  };

  const isNodeValid = Boolean(node.blockchainId && node.nodeType);

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
              (type) =>
                type.value ||
                type.disabled ||
                type.uiType === UiType.UI_TYPE_SWITCH,
            ),
      );

  // hack that needs removing
  const hasAddedFiles = () => {
    const activeNodeFiles = node.keyFiles?.find((f, i) => i === 0);

    if (!activeNodeFiles) return true;

    return !!activeNodeFiles?.files?.length;
  };

  const handleNodePropertyChanged = (name: string, value: any) =>
    setNode({
      ...node,
      [name]: value,
    });

  const handleNodeConfigPropertyChanged = (e: any) => {
    setServerError('');

    const propertiesCopy = [...node.properties];

    let foundProperty = propertiesCopy.find(
      (property) => property.name === e.target.name,
    );

    if (!foundProperty) return;

    foundProperty.value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setNode({
      ...node,
      properties: propertiesCopy,
    });
  };

  const handleHostChanged = (host: Host | null) => setSelectedHost(host);

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
      version: node.nodeVersion,
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
              resource:
                NodeScheduler_ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
            },
          },
    };

    createNode(
      params,
      mergedFiles.flat(),
      (nodeId: string) => {
        router.push(ROUTES.NODE(nodeId));
      },
      (error: string) => setServerError(error!),
    );
  };

  useEffect(() => {
    const activeBlockchain = blockchains.find(
      (b) => b.id === node.blockchainId,
    );

    if (!activeBlockchain) return;

    setNetworkList(activeBlockchain.networks.map((n: any) => n.name));

    const supportedNodeTypes = activeBlockchain.nodesTypes;

    const activeNodeType = supportedNodeTypes.find(
      (type: SupportedNodeType) => type.nodeType === +node.nodeType,
    );

    const nodeTypePropertiesCopy = [...activeNodeType?.properties!];

    const propertiesWithValue: NodeProperty[] = nodeTypePropertiesCopy.map(
      (property) => ({
        name: property.name,
        uiType: property.uiType,
        disabled: property.disabled,
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
      network: activeBlockchain?.networks?.length
        ? activeBlockchain?.networks[0]?.name
        : '',
    });
  }, [node.blockchainId, node.nodeType]);

  useEffect(() => {
    if (currentOrganization.current?.id !== defaultOrganization?.id) {
      currentOrganization.current = defaultOrganization;
    }
  }, [defaultOrganization]);

  return (
    <>
      <PageTitle title="Launch Node" icon={<IconRocket />} />
      <div css={[styles.wrapper, wrapper.main]}>
        <NodeLauncherProtocol
          onProtocolSelected={handleProtocolSelected}
          activeBlockchainId={node.blockchainId}
          activeNodeTypeId={node.nodeType}
        />
        {node.blockchainId && node.nodeType && node.properties?.length && (
          <NodeLauncherConfig
            isConfigValid={isConfigValid}
            onFileUploaded={handleFileUploaded}
            onNodeConfigPropertyChanged={handleNodeConfigPropertyChanged}
            onNodePropertyChanged={handleNodePropertyChanged}
            selectedHost={selectedHost}
            onHostChanged={handleHostChanged}
            networkList={networkList}
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
        {node.blockchainId && node.nodeType && node?.properties?.length && (
          <NodeLauncherSummary
            hasNetworkList={Boolean(networkList?.length)}
            serverError={serverError!}
            hasAddedFiles={hasAddedFiles()}
            isCreating={isCreating}
            isNodeValid={isNodeValid}
            isConfigValid={isConfigValid}
            blockchainId={node.blockchainId}
            nodeTypeId={node.nodeType}
            nodeTypeProperties={node.properties}
            onCreateNodeClicked={handleCreateNodeClicked}
          />
        )}
      </div>
    </>
  );
};
