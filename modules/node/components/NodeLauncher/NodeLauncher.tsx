import { styles } from './NodeLauncher.styles';
import { NodeLauncherPageHeader } from './NodeLauncherPageHeader';
import { useEffect, useRef, useState } from 'react';
import { NodeLauncherConfig } from './NodeLauncherConfig';
import { NodeLauncherProtocol } from './NodeLauncherProtocol';
import { NodeLauncherSummary } from './NodeLauncherSummary';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';
import { useRouter } from 'next/router';
import { EmptyColumn } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '@modules/organization';
import { wrapper } from 'styles/wrapper.styles';
import { ROUTES } from '@shared/index';
import {
  UiType,
  NodeProperty,
  NodeType,
} from '@modules/grpc/library/blockjoy/v1/node';
import { SupportedNodeType } from '@modules/grpc/library/blockjoy/v1/blockchain';

type NodeState = {
  blockchainId: string;
  nodeVersion: string;
  nodeTypeId: NodeType;
  nodeTypeProperties: NodeProperty[];
  nodeFiles?: NodeFiles[];
  network: string;
};

export type CreateNodeParams = {
  version: string;
  nodeType: number;
  blockchain: string;
  nodeTypeProperties: NodeProperty[];
  key_files?: File[];
  network: string;
};

export const NodeLauncher = () => {
  const { blockchains } = useGetBlockchains();
  const { createNode } = useNodeAdd();
  const router = useRouter();

  const [serverError, setServerError] = useState<string>();

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [networkList, setNetworkList] = useState<string[]>([]);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const currentOrganization = useRef(defaultOrganization);

  const [node, setNode] = useState<NodeState>({
    blockchainId: '',
    nodeTypeId: NodeType.NODE_TYPE_UNSPECIFIED,
    nodeTypeProperties: [],
    nodeVersion: '',
    network: '',
  });

  const handleProtocolSelected = (
    blockchainId: string,
    nodeTypeId: NodeType,
    nodeTypeProperties: NodeProperty[],
    nodeVersion: string,
  ) => {
    setServerError(undefined);
    setIsCreating(false);
    setNode({
      ...node,
      blockchainId,
      nodeTypeId,
      nodeTypeProperties,
      nodeVersion,
    });
  };

  const isNodeValid = Boolean(node.blockchainId && node.nodeTypeId);

  const isConfigValid = !node.nodeFiles
    ? null
    : Boolean(
        node.nodeFiles?.every((f) => f.files?.length) &&
          node.nodeTypeProperties
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
    const activeNodeFiles = node.nodeFiles?.find((f, i) => i === 0);

    if (!activeNodeFiles) return true;

    return !!activeNodeFiles?.files?.length;
  };

  const handleNetworkChanged = (network: string) => {
    setNode({
      ...node,
      network,
    });
  };

  const handlePropertyChanged = (e: any) => {
    setServerError('');

    const nodeTypePropertiesCopy = [...node.nodeTypeProperties];

    let foundProperty = nodeTypePropertiesCopy.find(
      (property) => property.name === e.target.name,
    );

    if (!foundProperty) return;

    foundProperty.value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setNode({
      ...node,
      nodeTypeProperties: nodeTypePropertiesCopy,
    });
  };

  const handleFileUploaded = (e: any) => {
    setServerError(undefined);
    const nodeFilesCopy = [...node.nodeFiles!];

    let foundNodeFiles = nodeFilesCopy.find(
      (files) => files.name === e.target.name,
    );

    if (!foundNodeFiles) return;

    for (let file of e?.target?.files) {
      foundNodeFiles?.files.push(file);
    }

    setNode({
      ...node,
      nodeFiles: nodeFilesCopy,
    });
  };

  const handleCreateNodeClicked = () => {
    setIsCreating(true);

    const mergedFiles: File[] = [];

    // build merged file array
    for (let f of node.nodeFiles!) {
      for (let nf of f.files) {
        mergedFiles.push(nf);
      }
    }

    const params: CreateNodeParams = {
      version: node.nodeVersion,
      nodeType: +node.nodeTypeId ?? 0,
      blockchain: node.blockchainId ?? '',
      nodeTypeProperties: node.nodeTypeProperties,
      key_files: mergedFiles.flat(),
      network: node.network,
    };

    createNode(
      params,
      (nodeId: string) => {
        router.push({
          pathname: `${ROUTES.NODE(nodeId)}`,
          query: { created: true },
        });
      },
      (error: string) => setServerError(error),
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
      (type: SupportedNodeType) => type.nodeType === +node.nodeTypeId,
    );

    const nodeTypePropertiesCopy = [...activeNodeType?.properties!];

    const propertiesWithValue: NodeProperty[] = nodeTypePropertiesCopy.map(
      (property) => ({
        name: property.name,
        uiType: property.uiType,
        disabled: property.disabled,
        required: property.required,
        label: '',
        description: '',
        value: property.default,
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
      nodeTypeProperties: propertiesWithValue,
      nodeFiles: fileProperties,
      network: activeBlockchain?.networks?.length
        ? activeBlockchain?.networks[0]?.name
        : '',
    });
  }, [node.blockchainId, node.nodeTypeId]);

  useEffect(() => {
    if (currentOrganization.current?.id !== defaultOrganization?.id) {
      setNode({
        blockchainId: '',
        nodeTypeId: NodeType.NODE_TYPE_UNSPECIFIED,
        nodeTypeProperties: [],
        nodeVersion: '',
        network: '',
      });
      currentOrganization.current = defaultOrganization;
    }
  }, [defaultOrganization]);

  return (
    <>
      <NodeLauncherPageHeader />
      <div css={[styles.wrapper, wrapper.main]}>
        <NodeLauncherProtocol
          onProtocolSelected={handleProtocolSelected}
          activeBlockchainId={node.blockchainId}
          activeNodeTypeId={node.nodeTypeId}
        />
        {node.blockchainId &&
          node.nodeTypeId &&
          node.nodeTypeProperties?.length && (
            <NodeLauncherConfig
              isConfigValid={isConfigValid}
              onFileUploaded={handleFileUploaded}
              onPropertyChanged={handlePropertyChanged}
              onNetworkChanged={handleNetworkChanged}
              nodeTypeProperties={node.nodeTypeProperties}
              nodeFiles={node.nodeFiles}
              networkList={networkList}
              nodeNetwork={node.network}
            />
          )}
        {!node.blockchainId && !node.nodeTypeId && (
          <div css={styles.empty}>
            <EmptyColumn
              title="Launch a Node"
              description="Select a protocol to get started"
            />
          </div>
        )}
        {node.blockchainId &&
          node.nodeTypeId &&
          node?.nodeTypeProperties?.length && (
            <NodeLauncherSummary
              hasNetworkList={Boolean(networkList?.length)}
              serverError={serverError!}
              hasAddedFiles={hasAddedFiles()}
              isCreating={isCreating}
              isNodeValid={isNodeValid}
              isConfigValid={isConfigValid}
              blockchainId={node.blockchainId}
              nodeTypeId={node.nodeTypeId}
              nodeTypeProperties={node.nodeTypeProperties}
              onCreateNodeClicked={handleCreateNodeClicked}
            />
          )}
      </div>
    </>
  );
};
