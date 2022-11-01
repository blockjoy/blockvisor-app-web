import { NodeStatus } from '../components/NodeStatus/NodeStatus';
import { TableGridCell } from '@shared/components';

export const toGrid = (
  nodeList: BlockjoyNode[] | null,
  onCellClick: (args0: any) => void,
) => {
  return nodeList?.map((node: any) => {
    console.log('nodeId', node.id);

    return {
      key: node.id,
      component: (
        <TableGridCell
          key={node.id}
          onCellClick={() => onCellClick({ key: node.id })}
          cellTitle={node.name}
          cellStatus={<NodeStatus hasBorder status={node.status} />}
        />
      ),
    };
  });
};
