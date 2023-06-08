import { TableBlock } from '@shared/components';
import { formatDistanceToNow } from 'date-fns';
import { BlockchainIcon, NodeStatus } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const mapNodeListToRows = (nodeList?: Node[]) => {
  const headers: TableHeader[] = [
    {
      name: '',
      key: '1',
      width: '40px',
      minWidth: '60px',
      maxWidth: '100px',
    },
    {
      name: 'Name',
      key: '2',
      width: '300px',
    },
    {
      name: 'Added',
      key: '3',
      width: '200px',
    },
    {
      name: 'Status',
      key: '4',
      width: '200px',
    },
  ];

  const rows = nodeList?.map((node: Node) => ({
    key: node.id,
    cells: [
      {
        key: '1',
        component: (
          <div style={{ marginTop: '4px', marginLeft: '8px' }}>
            <BlockchainIcon size="32px" blockchainName={node.blockchainName} />
          </div>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <TableBlock id={node.id} name={node.name} address={node?.ip!} />
          </>
        ),
      },
      {
        key: '3',
        component: (
          <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
            {formatDistanceToNow(new Date(node.createdAt!))}
          </span>
        ),
      },
      {
        key: '4',
        component: <NodeStatus status={node.status} />,
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
