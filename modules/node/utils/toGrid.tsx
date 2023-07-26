import { TableGridCell, NodeStatus } from '@shared/components';
import { BlockchainIcon } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';

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
          cellType={`${node.blockchainName} ${convertNodeTypeToName(
            node.nodeType,
          )}`}
        />
      ),
    };
  });
};
