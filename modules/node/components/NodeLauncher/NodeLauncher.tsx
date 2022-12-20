import { styles } from './NodeLauncher.styles';
import { NodeLauncherPageHeader } from './NodeLauncherPageHeader';
import { useEffect, useState } from 'react';
import { NodeLauncherConfig } from './NodeLauncherConfig';
import { NodeLauncherProtocol } from './NodeLauncherProtocol';
import { NodeLauncherSummary } from './NodeLauncherSummary';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';
import { useRouter } from 'next/router';

type NodeState = {
  blockchainId: string;
  nodeTypeId: string;
  nodeTypeProperties: NodeTypeConfig[];
  nodeFiles?: NodeFiles[];
};

export const NodeLauncher = () => {
  const { blockchains } = useGetBlockchains();
  const { createNode, loadLookups, hostList } = useNodeAdd();
  const router = useRouter();

  const [node, setNode] = useState<NodeState>({
    blockchainId: '',
    nodeTypeId: '',
    nodeTypeProperties: [],
  });

  const handleProtocolSelected = (
    blockchainId: string,
    nodeTypeId: string,
    nodeTypeProperties: NodeTypeConfig[],
  ) => {
    setNode({
      ...node,
      blockchainId,
      nodeTypeId,
      nodeTypeProperties,
    });
  };

  const isNodeValid = () => Boolean(node.blockchainId && node.nodeTypeId);

  const isConfigValid = () =>
    Boolean(
      node.nodeFiles?.every((f) => f.files?.length) &&
        node.nodeTypeProperties
          .filter((type) => type.ui_type !== 'key-upload')
          .every(
            (type) => type.value || type.disabled || type.ui_type === 'switch',
          ),
    );

  const handlePropertyChanged = (e: any) => {
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
    console.log('handleCreateNodeClicked', node);

    const mergedFiles: File[] = [];

    // build merged file array
    for (let f of node.nodeFiles!) {
      for (let nf of f.files) {
        mergedFiles.push(nf);
      }
    }

    const params: CreateNodeParams = {
      nodeType: +node.nodeTypeId ?? 0,
      blockchain: node.blockchainId ?? '',
      host: hostList[0].value,
      nodeTypeProperties: node.nodeTypeProperties,
      key_files: mergedFiles.flat(),
    };

    createNode(params, (nodeId: string) => {
      router.push(`/nodes/${nodeId}`);
    });
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
      value: null,
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

  return (
    <>
      <NodeLauncherPageHeader />
      <div css={styles.wrapper}>
        <NodeLauncherProtocol
          onProtocolSelected={handleProtocolSelected}
          activeBlockchainId={node.blockchainId}
          activeNodeTypeId={node.nodeTypeId}
        />
        {!!node.nodeTypeProperties?.length && (
          <NodeLauncherConfig
            onFileUploaded={handleFileUploaded}
            onPropertyChanged={handlePropertyChanged}
            nodeTypeProperties={node.nodeTypeProperties}
            nodeFiles={node.nodeFiles}
          />
        )}
        {node.blockchainId && node.nodeTypeId && (
          <NodeLauncherSummary
            isNodeValid={isNodeValid()}
            isConfigValid={isConfigValid()}
            blockchainId={node.blockchainId}
            nodeTypeId={node.nodeTypeId}
            onCreateNodeClicked={handleCreateNodeClicked}
          />
        )}
      </div>
    </>
  );
};
