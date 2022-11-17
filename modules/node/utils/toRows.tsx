import { TableBlockNodes } from '@shared/components';
import { NodeStatus } from '../components/NodeStatus/NodeStatus';
import { formatDistanceToNow } from 'date-fns';
import { BlockchainIcon } from '@shared/components';

export const toRows = (nodeList: BlockjoyNode[] | null) => {
  return nodeList?.map((node: any) => ({
    key: node.id,
    cells: [
      {
        key: '1',
        component: (
          <div style={{ marginTop: '4px' }}>
            <BlockchainIcon blockchainId={node.blockchainId} />
          </div>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <TableBlockNodes id={node.id} name={node.name} address={node.ip} />
          </>
        ),
      },
      {
        key: '3',
        component: (
          <span style={{ fontSize: '14px' }}>
            {formatDistanceToNow(new Date(node.created_at_datetime), {
              addSuffix: true,
            })}
          </span>
        ),
      },
      {
        key: '4',
        component: <NodeStatus status={node.status} />,
      },
    ],
  }));
};
