import { styles } from './NodeLauncher.styles';
import { NodeLauncherPageHeader } from './NodeLauncherPageHeader';
import { useEffect, useRef, useState } from 'react';
import { NodeLauncherConfig } from './NodeLauncherConfig';
import { NodeLauncherProtocol } from './NodeLauncherProtocol';
import { NodeLauncherSummary } from './NodeLauncherSummary';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';
import { useRouter } from 'next/router';
import { AnimatedGraphic } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '@modules/organization';

type NodeState = {
  blockchainId: string;
  nodeVersion: string;
  nodeTypeId: string;
  nodeTypeProperties: NodeTypeConfig[];
  nodeFiles?: NodeFiles[];
};

export const NodeLauncher = () => {
  const { blockchains } = useGetBlockchains();
  const { createNode, loadLookups } = useNodeAdd();
  const router = useRouter();

  const [hasServerError, setHasServerError] = useState<boolean>(false);

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const currentOrganization = useRef(defaultOrganization);

  const [node, setNode] = useState<NodeState>({
    blockchainId: '',
    nodeTypeId: '',
    nodeTypeProperties: [],
    nodeVersion: '',
  });

  const handleProtocolSelected = (
    blockchainId: string,
    nodeTypeId: string,
    nodeTypeProperties: NodeTypeConfig[],
    nodeVersion: string,
  ) => {
    setNode({
      ...node,
      blockchainId,
      nodeTypeId,
      nodeTypeProperties,
      nodeVersion,
    });
  };

  const isNodeValid = () => Boolean(node.blockchainId && node.nodeTypeId);

  const isConfigValid = () =>
    Boolean(
      node.nodeFiles?.every((f) => f.files?.length) &&
        node.nodeTypeProperties
          .filter((type) => type.required && type.ui_type !== 'key-upload')
          .every(
            (type) => type.value || type.disabled || type.ui_type === 'switch',
          ),
    );

  // hack that needs removing
  const hasAddedFiles = () => {
    const activeNodeFiles = node.nodeFiles?.find((f, i) => i === 0);

    if (!activeNodeFiles) return true;

    return !!activeNodeFiles?.files?.length;
  };

  const handlePropertyChanged = (e: any) => {
    setHasServerError(false);

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
    setHasServerError(false);
    console.log('handleFileUploaded', e.target.value);

    const nodeFilesCopy = [...node.nodeFiles!];

    let foundNodeFiles = nodeFilesCopy.find(
      (files) => files.name === e.target.name,
    );

    if (!foundNodeFiles) return;

    foundNodeFiles?.files.push(e?.target?.value);

    setNode({
      ...node,
      nodeFiles: nodeFilesCopy,
    });

    console.log('node', node);
  };

  const handleCreateNodeClicked = () => {
    setIsCreating(true);

    console.log('handleCreateNodeClicked', node);

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
    };

    createNode(
      params,
      (nodeId: string) => {
        setIsCreating(false);
        router.push(`/nodes/${nodeId}`);
      },
      () => setHasServerError(true),
    );
  };

  useEffect(() => {
    const activeBlockchain = blockchains.find(
      (b) => b.id === node.blockchainId,
    );

    if (!activeBlockchain) return;

    const activeNodeType = activeBlockchain.supported_node_types.find(
      (type: any) => type.id === +node.nodeTypeId,
    );

    const nodeTypePropertiesCopy = [...activeNodeType.properties];

    const propertiesWithValue = nodeTypePropertiesCopy.map((property) => ({
      ...property,
      value:
        property.ui_type === 'switch'
          ? property.default === 'true'
            ? true
            : false
          : null,
    }));

    const fileProperties: NodeFiles[] = propertiesWithValue
      .filter((p) => p.ui_type === 'key-upload')
      .map((p) => ({
        name: p.name,
        files: [],
      }));

    setNode({
      ...node,
      nodeTypeProperties: propertiesWithValue,
      nodeFiles: fileProperties,
    });

    console.log('node', node);
  }, [node.blockchainId, node.nodeTypeId]);

  useEffect(() => {
    loadLookups();
  }, []);

  useEffect(() => {
    if (currentOrganization.current?.id !== defaultOrganization?.id) {
      setNode({
        blockchainId: '',
        nodeTypeId: '',
        nodeTypeProperties: [],
      });
      currentOrganization.current = defaultOrganization;
    }
  }, [defaultOrganization]);

  return (
    <>
      <NodeLauncherPageHeader />
      <div css={styles.wrapper}>
        <NodeLauncherProtocol
          onProtocolSelected={handleProtocolSelected}
          activeBlockchainId={node.blockchainId}
          activeNodeTypeId={node.nodeTypeId}
        />
        {!!node.nodeTypeProperties?.filter(
          (property) => property.name !== 'self-hosted',
        )?.length && (
          <NodeLauncherConfig
            isConfigValid={isConfigValid()}
            onFileUploaded={handleFileUploaded}
            onPropertyChanged={handlePropertyChanged}
            nodeTypeProperties={node.nodeTypeProperties}
            nodeFiles={node.nodeFiles}
          />
        )}
        {!node.blockchainId && !node.nodeTypeId && (
          <div css={styles.empty}>
            <AnimatedGraphic />
            <div>
              <h2>Launch a Node</h2>
              <h3>Select a protocol to get started</h3>
            </div>
          </div>
        )}
        {node.blockchainId && node.nodeTypeId && (
          <NodeLauncherSummary
            hasServerError={hasServerError}
            hasAddedFiles={hasAddedFiles()}
            isCreating={isCreating}
            isNodeValid={isNodeValid()}
            isConfigValid={isConfigValid()}
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
