import { TableGridCell, NodeStatus } from '@shared/components';
import { nodeTypeList } from '@shared/constants/lookups';
import { BlockchainIcon } from '@shared/components';
import { Node, NodeType } from '@modules/grpc/library/blockjoy/v1/node';

export const toGrid = (nodeList: Node[], onCellClick: (args0: any) => void) => {
  return nodeList?.map((node: Node) => {
    return {
      key: node.id,
      component: (
        <TableGridCell
          key={node.id}
          onCellClick={() => onCellClick({ key: node.id })}
          cellTitle={node.name}
          cellIcon={
            <BlockchainIcon size="28px" blockchainName={node.blockchainName} />
          }
          cellStatus={<NodeStatus hasBorder status={node.status} />}
          cellType={`${node.blockchainName} ${NodeType[node.nodeType]
            .replace('NODE_TYPE_', '')
            .toLowerCase()}`}
        />
      ),
    };
  });
};
