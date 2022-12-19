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
    console.log('handleBlockchainClicked', {
      blockchainId,
      nodeTypeId,
      nodeTypeProperties,
    });
  };

  const isNodeValid = () =>
    !!(
      node.blockchainId &&
      node.nodeTypeId &&
      node.nodeTypeProperties.every((type) => type.value || type.disabled)
    );

  const handlePropertyChanged = (e: any) => {
    const nodeTypePropertiesCopy = [...node.nodeTypeProperties];

    let foundProperty = nodeTypePropertiesCopy.find(
      (property) => property.name === e.target.name,
    );

    console.log('handlePropertyChanged', foundProperty);

    if (!foundProperty) return;

    foundProperty.value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setNode({
      ...node,
      nodeTypeProperties: nodeTypePropertiesCopy,
    });
  };

  const handleFileUploaded = (e: any) => {
    console.log('values', e.target.values);
    console.log('name', e.target.name);

    const nodeTypePropertiesCopy = [...node.nodeTypeProperties];

    let foundProperty = nodeTypePropertiesCopy.find(
      (property) => property.name === e.target.name,
    );

    console.log('nodeTypePropertiesCopy', nodeTypePropertiesCopy);

    if (!foundProperty) return;

    foundProperty.value = e.target.value;

    setNode({
      ...node,
      nodeTypeProperties: nodeTypePropertiesCopy,
    });
  };

  const handleCreateNodeClicked = () => {
    console.log('handleCreateNodeClicked', node);

    const params: CreateNodeParams = {
      nodeType: +node.nodeTypeId ?? 0,
      blockchain: node.blockchainId ?? '',
      host: hostList[0].value,
      nodeTypeProperties: node.nodeTypeProperties,
    };

    createNode(params, (nodeId: string) => {
      router.push(`/nodes/${nodeId}`);
    });
  };

  useEffect(() => {
    loadLookups();

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

    console.log('hitting this', propertiesWithValue);

    setNode({
      ...node,
      nodeTypeProperties: propertiesWithValue,
    });
    // foundProperty.value = e;
  }, [node.blockchainId, node.nodeTypeId]);

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
          />
        )}
        {node.blockchainId && node.nodeTypeId && (
          <NodeLauncherSummary
            isNodeValid={isNodeValid()}
            nodeTypeProperties={node.nodeTypeProperties}
            blockchainId={node.blockchainId}
            nodeTypeId={node.nodeTypeId}
            onCreateNodeClicked={handleCreateNodeClicked}
          />
        )}
      </div>
    </>
  );
};
