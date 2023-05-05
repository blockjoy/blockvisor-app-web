import { TableBlockNodes } from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { BlockchainIcon, NodeStatus } from '@shared/components';

export const toRows = (nodeList: BlockjoyNode[] | null) => {
  return nodeList?.map((node) => ({
    key: node.id,
    cells: [
      {
        key: '1',
        component: (
          <div style={{ marginTop: '4px' }}>
            <BlockchainIcon blockchainName={node.blockchainName} />
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
            {formatDistanceToNow(new Date(node.created), {
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
