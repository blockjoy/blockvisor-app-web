import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import {
  Blockchain,
  BlockchainNodeType,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { convertNodeTypeToName } from './convertNodeTypeToName';

const getUniqueNodeTypes = (blockchain: Blockchain) => {
  const listedNodeTypes: NodeType[] = [];

  const uniqueNodeTypes: BlockchainNodeType[] = blockchain?.nodeTypes?.reduce(
    (accumulator: BlockchainNodeType[], blockchainNodeType) => {
      const nodeType = blockchainNodeType.nodeType;

      if (!listedNodeTypes.includes(nodeType)) {
        accumulator.push(blockchainNodeType);
        listedNodeTypes.push(nodeType);
      }

      return accumulator;
    },
    [],
  );

  return uniqueNodeTypes;
};

export const getNodeTypes = (blockchain: Blockchain) => {
  const uniqueNodeTypes = getUniqueNodeTypes(blockchain);

  return uniqueNodeTypes?.sort((a, b) =>
    convertNodeTypeToName(a.nodeType).localeCompare(
      convertNodeTypeToName(b.nodeType),
    ),
  );
};
