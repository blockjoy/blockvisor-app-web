import { useRecoilState, useRecoilValue } from 'recoil';
import { BlockchainNodeType } from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  nodeLauncherAtoms,
  nodeLauncherSelectors,
  convertNodeTypeToName,
} from '@modules/node';
import { PillPicker } from '@shared/components';

type ExtendedBlockchainNodeType = BlockchainNodeType & { name?: string };

export const NodeTypeSelect = () => {
  const nodeTypes = useRecoilValue(
    nodeLauncherSelectors.selectedBlockchainNodeTypes,
  );
  const [selectedNodeType, setSelectedNodeType] = useRecoilState(
    nodeLauncherAtoms.selectedNodeType,
  );

  const handleChanged = (item: ExtendedBlockchainNodeType) => {
    const { name, ...updatedNodeType } = item;
    setSelectedNodeType(updatedNodeType);
  };

  const extendedNodeTypes = nodeTypes.map((nodeType) => ({
    ...nodeType,
    name: convertNodeTypeToName(nodeType.nodeType),
  }));

  return (
    <PillPicker
      name="nodeType"
      items={extendedNodeTypes}
      selectedItem={selectedNodeType!}
      onChange={handleChanged}
    />
  );
};
