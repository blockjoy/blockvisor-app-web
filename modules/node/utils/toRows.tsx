import { TableBlockNodes } from '@shared/components';
import { NodeStatus } from '../components/NodeStatus/NodeStatus';
import { formatDistanceToNow } from 'date-fns';

export const toRows = (nodeList: BlockjoyNode[] | null) => {
  console.log('nodeList', nodeList);

  return nodeList?.map((node: any) => ({
    key: node.id,
    cells: [
      {
        key: '1',
        component: (
          <>
            <TableBlockNodes id={node.id} name={node.name} address={node.ip} />
          </>
        ),
      },
      {
        key: '2',
        component: (
          <span style={{ fontSize: '14px' }}>
            {formatDistanceToNow(new Date(node.created_at_datetime), {
              addSuffix: true,
            })}
          </span>
        ),
      },
      {
        key: '3',
        component: <NodeStatus status={node.status} />,
      },
    ],
  }));
};
