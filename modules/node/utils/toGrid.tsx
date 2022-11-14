import { NodeStatus } from '../components/NodeStatus/NodeStatus';
import { TableGridCell } from '@shared/components';
import { nodeTypeList } from '@shared/constants/lookups';
import { BlockchainIcon } from '@shared/components';

export const toGrid = (
  nodeList: BlockjoyNode[] | null,
  onCellClick: (args0: any) => void,
) => {
  return nodeList?.map((node: any) => {
    return {
      key: node.id,
      component: (
        <TableGridCell
          key={node.id}
          onCellClick={() => onCellClick({ key: node.id })}
          cellTitle={node.name}
          cellIcon={<BlockchainIcon />}
          cellStatus={<NodeStatus hasBorder status={node.status} />}
          cellType={
            nodeTypeList.find((n) => n.id === JSON.parse(node.type).id)?.name
          }
        />
      ),
    };
  });
};
