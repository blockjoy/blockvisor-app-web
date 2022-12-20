import { NodeStatus } from '../components/NodeStatus/NodeStatus';
import { TableGridCell } from '@shared/components';
import { nodeTypeList } from '@shared/constants/lookups';
import { BlockchainIcon } from '@shared/components';

export const toGrid = (
  nodeList: BlockjoyNode[],
  onCellClick: (args0: any) => void,
) => {
  return nodeList?.map((node: any) => {
    // TODO: delete the replace ASAP!!!
    // const node_type = node.type.replace('}{', '},{');

    let error = '';

    try {
      JSON.parse(node.type);
    } catch (e) {
      console.log('JSON', node.type.toString());
      console.log('e', e);
    }

    const parsedJSON = JSON.parse(node.type);

    console.log('parsedJSON', parsedJSON);

    return {
      key: node.id,
      component: (
        <TableGridCell
          key={node.id}
          onCellClick={() => onCellClick({ key: node.id })}
          cellTitle={node.name}
          cellIcon={<BlockchainIcon blockchainId={node.blockchainId} />}
          cellStatus={<NodeStatus hasBorder status={node.status} />}
          cellType={
            nodeTypeList.find((n) => n.id === JSON.parse(node.type).id)?.name
          }
        />
      ),
    };
  });
};
